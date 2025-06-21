import { useState, useEffect } from "react";
import {
  ArrowLeft,
  User,
  Lock,
  CheckCircle,
  AlertCircle,
  X,
  Check,
} from "lucide-react";
import "./style.css";
import { useUserProfile } from "../../hooks/useUser";
import Loading from "../../components/base/Loading";

interface UserProfile {
  fullName: string;
  username: string;
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function UserProfile() {
  const { data, isLoading } = useUserProfile();
  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (data) {
      setUserProfile({
        fullName: data.fullName || "",
        username: data.username || "",
        email: data.email || "", // nếu không có thì gán rỗng
      });
    }
  }, [data]);

  console.log(data);

  const [editProfile, setEditProfile] = useState<UserProfile>({
    fullName: "",
    username: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [profileAlert, setProfileAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [passwordAlert, setPasswordAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="profile-container">
        <div className="profile-main-content">
          <p>Could not load user profile.</p>
        </div>
      </div>
    );
  }

  // Password validation
  const validatePassword = (password: string) => {
    return {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  const passwordValidation = validatePassword(passwordData.newPassword);
  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleEditProfile = () => {
    setEditProfile(userProfile);
    setIsEditingProfile(true);
    setProfileAlert(null);
  };

  const handleCancelEditProfile = () => {
    setEditProfile({ fullName: "", username: "", email: "" });
    setIsEditingProfile(false);
    setProfileAlert(null);
  };

  const handleSaveProfile = async () => {
    setIsLoadingProfile(true);
    setProfileAlert(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validate fields
      if (
        !editProfile.fullName.trim() ||
        !editProfile.username.trim() ||
        !editProfile.email.trim()
      ) {
        throw new Error("All fields are required");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editProfile.email)) {
        throw new Error("Please enter a valid email address");
      }

      setUserProfile(editProfile);
      setIsEditingProfile(false);
      setProfileAlert({
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (error) {
      setProfileAlert({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to update profile",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoadingPassword(true);
    setPasswordAlert(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validate fields
      if (
        !passwordData.currentPassword ||
        !passwordData.newPassword ||
        !passwordData.confirmPassword
      ) {
        throw new Error("All password fields are required");
      }

      if (!isPasswordValid) {
        throw new Error("New password does not meet requirements");
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match");
      }

      if (passwordData.currentPassword === passwordData.newPassword) {
        throw new Error("New password must be different from current password");
      }

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
      setPasswordAlert({
        type: "success",
        message: "Password changed successfully!",
      });
    } catch (error) {
      setPasswordAlert({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to change password",
      });
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="profile-back-button"
      >
        <ArrowLeft className="profile-back-icon" />
        Back
      </button>

      {/* Main Content */}
      <div className="profile-main-content">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-title">Your Profile</h1>
          <p className="profile-subtitle">Manage your account information</p>
        </div>

        <div className="profile-content">
          {/* Profile Information Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">
                <User className="profile-icon" />
                Personal Information
              </h2>
            </div>
            <div className="profile-card-content">
              {/* Avatar Section */}
              <div className="profile-avatar-section">
                <div className="profile-avatar">
                  {getInitials(userProfile.fullName)}
                </div>
                <div className="profile-avatar-name">
                  {userProfile.fullName}
                </div>
                <div className="profile-avatar-email">{userProfile.email}</div>
              </div>

              {/* Alert */}
              {profileAlert && (
                <div
                  className={`profile-alert ${
                    profileAlert.type === "success"
                      ? "profile-alert-success"
                      : "profile-alert-error"
                  }`}
                >
                  {profileAlert.type === "success" ? (
                    <CheckCircle className="profile-alert-icon" />
                  ) : (
                    <AlertCircle className="profile-alert-icon" />
                  )}
                  {profileAlert.message}
                </div>
              )}

              {/* Profile Form */}
              <form
                className="profile-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="profile-form-input"
                    value={
                      isEditingProfile
                        ? editProfile.fullName
                        : userProfile.fullName
                    }
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        fullName: e.target.value,
                      })
                    }
                    disabled={!isEditingProfile}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="profile-form-input"
                    value={
                      isEditingProfile
                        ? editProfile.username
                        : userProfile.username
                    }
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        username: e.target.value,
                      })
                    }
                    disabled={!isEditingProfile}
                    placeholder="Enter your username"
                  />
                </div>

                <div className="profile-form-group">
                  <label className="profile-form-label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="profile-form-input"
                    value={
                      isEditingProfile ? editProfile.email : userProfile.email
                    }
                    onChange={(e) =>
                      setEditProfile({ ...editProfile, email: e.target.value })
                    }
                    disabled={!isEditingProfile}
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="profile-button-group">
                  {isEditingProfile ? (
                    <>
                      <button
                        type="button"
                        onClick={handleCancelEditProfile}
                        className="profile-button profile-button-secondary"
                        disabled={isLoadingProfile}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="profile-button profile-button-primary"
                        disabled={isLoadingProfile}
                      >
                        {isLoadingProfile ? (
                          <div className="profile-loading">
                            <div className="profile-spinner"></div>
                            Saving...
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleEditProfile}
                      className="profile-button profile-button-primary"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Password Change Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <h2 className="profile-card-title">
                <Lock className="profile-icon" />
                Change Password
              </h2>
            </div>
            <div className="profile-card-content">
              {/* Alert */}
              {passwordAlert && (
                <div
                  className={`profile-alert ${
                    passwordAlert.type === "success"
                      ? "profile-alert-success"
                      : "profile-alert-error"
                  }`}
                >
                  {passwordAlert.type === "success" ? (
                    <CheckCircle className="profile-alert-icon" />
                  ) : (
                    <AlertCircle className="profile-alert-icon" />
                  )}
                  {passwordAlert.message}
                </div>
              )}

              {!isChangingPassword ? (
                <div className="profile-button-group-full">
                  <button
                    type="button"
                    onClick={() => setIsChangingPassword(true)}
                    className="profile-button profile-button-primary"
                    disabled={true}
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <form
                  className="profile-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="profile-form-group">
                    <label
                      className="profile-form-label"
                      htmlFor="currentPassword"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="profile-form-input"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter your current password"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-form-label" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      className="profile-form-input"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter your new password"
                    />
                    {passwordData.newPassword && (
                      <div className="profile-password-requirements">
                        <div className="profile-password-requirements-title">
                          Password Requirements:
                        </div>
                        <ul className="profile-password-requirements-list">
                          <li
                            className={`profile-password-requirement ${
                              passwordValidation.length ? "valid" : ""
                            }`}
                          >
                            {passwordValidation.length ? (
                              <Check className="profile-password-requirement-icon" />
                            ) : (
                              <X className="profile-password-requirement-icon" />
                            )}
                            At least 8 characters
                          </li>
                          <li
                            className={`profile-password-requirement ${
                              passwordValidation.uppercase ? "valid" : ""
                            }`}
                          >
                            {passwordValidation.uppercase ? (
                              <Check className="profile-password-requirement-icon" />
                            ) : (
                              <X className="profile-password-requirement-icon" />
                            )}
                            One uppercase letter
                          </li>
                          <li
                            className={`profile-password-requirement ${
                              passwordValidation.lowercase ? "valid" : ""
                            }`}
                          >
                            {passwordValidation.lowercase ? (
                              <Check className="profile-password-requirement-icon" />
                            ) : (
                              <X className="profile-password-requirement-icon" />
                            )}
                            One lowercase letter
                          </li>
                          <li
                            className={`profile-password-requirement ${
                              passwordValidation.number ? "valid" : ""
                            }`}
                          >
                            {passwordValidation.number ? (
                              <Check className="profile-password-requirement-icon" />
                            ) : (
                              <X className="profile-password-requirement-icon" />
                            )}
                            One number
                          </li>
                          <li
                            className={`profile-password-requirement ${
                              passwordValidation.special ? "valid" : ""
                            }`}
                          >
                            {passwordValidation.special ? (
                              <Check className="profile-password-requirement-icon" />
                            ) : (
                              <X className="profile-password-requirement-icon" />
                            )}
                            One special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="profile-form-group">
                    <label
                      className="profile-form-label"
                      htmlFor="confirmPassword"
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="profile-form-input"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm your new password"
                    />
                  </div>

                  <div className="profile-button-group">
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                        setPasswordAlert(null);
                      }}
                      className="profile-button profile-button-secondary"
                      disabled={isLoadingPassword}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleChangePassword}
                      className="profile-button profile-button-primary"
                      disabled={isLoadingPassword}
                    >
                      {isLoadingPassword ? (
                        <div className="profile-loading">
                          <div className="profile-spinner"></div>
                          Changing...
                        </div>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
