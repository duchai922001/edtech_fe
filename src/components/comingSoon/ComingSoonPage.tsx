import { Clock } from "lucide-react";
import "./comingsoon.css";

export default function ComingSoonPage() {
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
          {/* <div className="countdown-timer">
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
          </div> */}

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
