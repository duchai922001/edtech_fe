import type React from "react";
import { useState } from "react";
import { Leaf, Clock, Bell } from "lucide-react";
import "./comingsoon.css";

// Inline Button Component
const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  onClick?: () => void;
  type?: "button" | "submit";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50";

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} h-10 px-6 py-2 text-sm ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Inline Input Component
const Input = ({
  className = "",
  ...props
}: {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${className}`}
      {...props}
    />
  );
};

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <div className="coming-soon-page">
      {/* Header */}
      {/* <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <Leaf className="leaf-icon" />
          </div>
          <span className="logo-text">EcoTech</span>
        </div>
      </header> */}

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {/* Coming Soon Badge */}
          <div className="coming-soon-badge">
            <Clock className="clock-icon" />
            Coming Soon
          </div>

          {/* Main Title */}
          <h1 className="main-title">
            This Feature Is
            <span className="title-highlight"> Coming Soon</span>
          </h1>

          {/* Description */}
          <p className="description">
            We're working hard to bring you something amazing. This feature will
            be available very soon!
          </p>

          {/* Countdown Timer */}
          <div className="countdown-timer">
            {[
              { label: "Days", value: "15" },
              { label: "Hours", value: "08" },
              { label: "Minutes", value: "42" },
            ].map((item, index) => (
              <div key={index} className="countdown-item">
                <div className="countdown-value">{item.value}</div>
                <div className="countdown-label">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Email Notification */}
          {/* <div className="email-section">
            <h3 className="email-title">Get notified when we launch</h3>
            <div className="email-form">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
              />
              <Button onClick={handleEmailSubmit} className="notify-button">
                <Bell className="bell-icon" />
                {isSubscribed ? "Done!" : "Notify Me"}
              </Button>
            </div>
          </div> */}
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="footer">
        <p className="footer-text">&copy; 2024 EcoTech. We'll be back soon!</p>
      </footer> */}
    </div>
  );
}
