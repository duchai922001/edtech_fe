import { useState, useEffect } from "react";
import {
  Mail,
  CheckCircle,
  AlertCircle,
  Info,
  X,
  Check,
  UserPlus,
} from "lucide-react";
import "./style.css";

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

interface EmailVerification {
  isEmailSent: boolean;
  verificationCode: string;
  isVerified: boolean;
  timer: number;
}

export default function SignupPage() {
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [emailVerification, setEmailVerification] = useState<EmailVerification>(
    {
      isEmailSent: false,
      verificationCode: "",
      isVerified: false,
      timer: 0,
    }
  );

  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  // Timer effect for resend email
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (emailVerification.timer > 0) {
      interval = setInterval(() => {
        setEmailVerification((prev) => ({ ...prev, timer: prev.timer - 1 }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [emailVerification.timer]);

  // Password validation
  const validatePassword = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const passwordValidation = validatePassword(signupData.password);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  // Form validation
  const isFormValid = () => {
    return (
      signupData.fullName.trim() &&
      signupData.username.trim() &&
      signupData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email) &&
      isPasswordValid &&
      emailVerification.isVerified
    );
  };

  const handleSendVerificationEmail = async () => {
    if (!signupData.email.trim()) {
      setAlert({
        type: "error",
        message: "Please enter your email address first",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
      setAlert({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsLoadingEmail(true);
    setAlert(null);

    try {
      // Simulate API call to send verification email
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setEmailVerification((prev) => ({
        ...prev,
        isEmailSent: true,
        timer: 60, // 60 seconds cooldown
      }));

      setAlert({
        type: "success",
        message: `Verification code sent to ${signupData.email}. Please check your inbox.`,
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to send verification email. Please try again.",
      });
    } finally {
      setIsLoadingEmail(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!emailVerification.verificationCode.trim()) {
      setAlert({
        type: "error",
        message: "Please enter the verification code",
      });
      return;
    }

    if (emailVerification.verificationCode.length !== 6) {
      setAlert({
        type: "error",
        message: "Verification code must be 6 digits",
      });
      return;
    }

    setIsLoadingVerify(true);
    setAlert(null);

    try {
      // Simulate API call to verify code
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate verification (in real app, this would be validated by backend)
      if (emailVerification.verificationCode === "123456") {
        setEmailVerification((prev) => ({ ...prev, isVerified: true }));
        setAlert({ type: "success", message: "Email verified successfully!" });
      } else {
        throw new Error("Invalid verification code");
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Verification failed",
      });
    } finally {
      setIsLoadingVerify(false);
    }
  };

  const handleSignup = async () => {
    if (!isFormValid()) {
      setAlert({
        type: "error",
        message: "Please complete all required fields",
      });
      return;
    }

    setIsLoadingSignup(true);
    setAlert(null);

    try {
      // Simulate API call to create account
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSignupComplete(true);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoadingSignup(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isSignupComplete) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-success">
            <CheckCircle className="signup-success-icon" />
            <h1 className="signup-success-title">
              Account Created Successfully!
            </h1>
            <p className="signup-success-message">
              Welcome to our platform! Your account has been created and your
              email has been verified.
            </p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="signup-button signup-button-primary"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      {/* Signup Card */}
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Create Account</h1>
          <p className="signup-subtitle">
            Join us today and start your journey
          </p>
        </div>

        <div className="signup-content">
          {/* Alert */}
          {alert && (
            <div
              className={`signup-alert ${
                alert.type === "success"
                  ? "signup-alert-success"
                  : alert.type === "error"
                  ? "signup-alert-error"
                  : "signup-alert-info"
              }`}
            >
              {alert.type === "success" ? (
                <CheckCircle className="signup-alert-icon" />
              ) : alert.type === "error" ? (
                <AlertCircle className="signup-alert-icon" />
              ) : (
                <Info className="signup-alert-icon" />
              )}
              {alert.message}
            </div>
          )}

          {/* Signup Form */}
          <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div className="signup-form-group">
              <label className="signup-form-label" htmlFor="fullName">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                className="signup-form-input"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Username */}
            <div className="signup-form-group">
              <label className="signup-form-label" htmlFor="username">
                Username *
              </label>
              <input
                type="text"
                id="username"
                className="signup-form-input"
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({ ...signupData, username: e.target.value })
                }
                placeholder="Choose a username"
                required
              />
            </div>

            {/* Email */}
            <div className="signup-form-group">
              <label className="signup-form-label" htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className={`signup-form-input ${
                  emailVerification.isVerified ? "success" : ""
                }`}
                value={signupData.email}
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                  // Reset verification if email changes
                  if (
                    emailVerification.isEmailSent ||
                    emailVerification.isVerified
                  ) {
                    setEmailVerification({
                      isEmailSent: false,
                      verificationCode: "",
                      isVerified: false,
                      timer: 0,
                    });
                  }
                }}
                placeholder="Enter your email address"
                required
              />

              {/* Email Verification Section */}
              {signupData.email &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email) && (
                  <div
                    className={`signup-email-verification ${
                      emailVerification.isVerified ? "verified" : ""
                    }`}
                  >
                    {!emailVerification.isEmailSent ? (
                      <button
                        type="button"
                        onClick={handleSendVerificationEmail}
                        className="signup-button signup-button-secondary signup-button-small"
                        disabled={isLoadingEmail}
                      >
                        {isLoadingEmail ? (
                          <div className="signup-loading">
                            <div className="signup-spinner"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Mail className="signup-icon" />
                            Send Verification Code
                          </>
                        )}
                      </button>
                    ) : !emailVerification.isVerified ? (
                      <>
                        <div className="signup-verification-row">
                          <div className="signup-verification-input">
                            <label
                              className="signup-form-label"
                              htmlFor="verificationCode"
                            >
                              Verification Code
                            </label>
                            <input
                              type="text"
                              id="verificationCode"
                              className="signup-form-input signup-verification-code-input"
                              value={emailVerification.verificationCode}
                              onChange={(e) =>
                                setEmailVerification({
                                  ...emailVerification,
                                  verificationCode: e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 6),
                                })
                              }
                              placeholder="000000"
                              maxLength={6}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={handleVerifyCode}
                            className="signup-button signup-button-primary signup-button-small"
                            disabled={
                              isLoadingVerify ||
                              emailVerification.verificationCode.length !== 6
                            }
                          >
                            {isLoadingVerify ? (
                              <div className="signup-loading">
                                <div className="signup-spinner"></div>
                              </div>
                            ) : (
                              "Verify"
                            )}
                          </button>
                        </div>

                        {/* Timer and Resend */}
                        <div className="signup-timer">
                          {emailVerification.timer > 0 ? (
                            <span className="active">
                              Resend code in{" "}
                              {formatTimer(emailVerification.timer)}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendVerificationEmail}
                              className="signup-login-button"
                              disabled={isLoadingEmail}
                            >
                              Resend verification code
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="signup-alert signup-alert-success">
                        <CheckCircle className="signup-alert-icon" />
                        Email verified successfully!
                      </div>
                    )}
                  </div>
                )}
            </div>

            {/* Password */}
            <div className="signup-form-group">
              <label className="signup-form-label" htmlFor="password">
                Password *
              </label>
              <input
                type="password"
                id="password"
                className={`signup-form-input ${
                  isPasswordValid ? "success" : ""
                }`}
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                placeholder="Create a strong password"
                required
              />

              {/* Password Requirements */}
              {signupData.password && (
                <div className="signup-password-requirements">
                  <div className="signup-password-requirements-title">
                    Password Requirements:
                  </div>
                  <ul className="signup-password-requirements-list">
                    <li
                      className={`signup-password-requirement ${
                        passwordValidation.length ? "valid" : ""
                      }`}
                    >
                      {passwordValidation.length ? (
                        <Check className="signup-password-requirement-icon" />
                      ) : (
                        <X className="signup-password-requirement-icon" />
                      )}
                      At least 8 characters
                    </li>
                    <li
                      className={`signup-password-requirement ${
                        passwordValidation.uppercase ? "valid" : ""
                      }`}
                    >
                      {passwordValidation.uppercase ? (
                        <Check className="signup-password-requirement-icon" />
                      ) : (
                        <X className="signup-password-requirement-icon" />
                      )}
                      One uppercase letter
                    </li>
                    <li
                      className={`signup-password-requirement ${
                        passwordValidation.lowercase ? "valid" : ""
                      }`}
                    >
                      {passwordValidation.lowercase ? (
                        <Check className="signup-password-requirement-icon" />
                      ) : (
                        <X className="signup-password-requirement-icon" />
                      )}
                      One lowercase letter
                    </li>
                    <li
                      className={`signup-password-requirement ${
                        passwordValidation.number ? "valid" : ""
                      }`}
                    >
                      {passwordValidation.number ? (
                        <Check className="signup-password-requirement-icon" />
                      ) : (
                        <X className="signup-password-requirement-icon" />
                      )}
                      One number
                    </li>
                    <li
                      className={`signup-password-requirement ${
                        passwordValidation.special ? "valid" : ""
                      }`}
                    >
                      {passwordValidation.special ? (
                        <Check className="signup-password-requirement-icon" />
                      ) : (
                        <X className="signup-password-requirement-icon" />
                      )}
                      One special character
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Signup Button */}
            <button
              type="button"
              onClick={handleSignup}
              className="signup-button signup-button-primary"
              disabled={!isFormValid() || isLoadingSignup}
            >
              {isLoadingSignup ? (
                <div className="signup-loading">
                  <div className="signup-spinner"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  <UserPlus className="signup-icon" />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="signup-login-link">
            <span className="signup-login-text">Already have an account? </span>
            <button
              onClick={() => (window.location.href = "/login")}
              className="signup-login-button"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
