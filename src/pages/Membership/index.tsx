"use client";

import type React from "react";
import { useState } from "react";
import "./style.css";

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: "monthly" | "yearly";
  description: string;
  features: string[];
  isPopular?: boolean;
  isCurrentPlan?: boolean;
  badge?: string;
}

// interface Feature {
//   icon: string;
//   title: string;
//   description: string;
// }

// Mock data
const membershipPlans: MembershipPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    duration: "monthly",
    description: "Perfect for getting started with flashcards",
    features: [
      "Create up to 5 flashcard sets",
      "Basic study modes",
      "Mobile app access",
      "Community support",
      "Basic progress tracking",
    ],
    isCurrentPlan: true,
  },
  {
    id: "pro-monthly",
    name: "Pro",
    price: 9.99,
    duration: "monthly",
    description: "Ideal for serious learners and students",
    features: [
      "Unlimited flashcard sets",
      "Advanced study modes",
      "Offline access",
      "Progress analytics",
      "Custom themes",
      "Priority support",
      "Export/Import cards",
      "Collaboration features",
    ],
    isPopular: true,
  },
  {
    id: "pro-yearly",
    name: "Pro",
    price: 79.99,
    originalPrice: 119.88,
    duration: "yearly",
    description: "Best value for committed learners",
    features: [
      "Everything in Pro Monthly",
      "2 months free",
      "Advanced AI suggestions",
      "Bulk operations",
      "API access",
      "White-label options",
      "Premium templates",
      "1-on-1 onboarding",
    ],
    badge: "Best Value",
  },
  {
    id: "team",
    name: "Team",
    price: 19.99,
    duration: "monthly",
    description: "Perfect for educators and organizations",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team management dashboard",
      "Shared libraries",
      "Usage analytics",
      "SSO integration",
      "Dedicated account manager",
      "Custom branding",
    ],
  },
];

// const features: Feature[] = [
//   {
//     icon: "🚀",
//     title: "Accelerated Learning",
//     description:
//       "Advanced spaced repetition algorithms help you learn faster and retain information longer",
//   },
//   {
//     icon: "📊",
//     title: "Progress Analytics",
//     description:
//       "Detailed insights into your learning progress with comprehensive statistics and reports",
//   },
//   {
//     icon: "🎯",
//     title: "Smart Study Modes",
//     description:
//       "Multiple study modes including flashcards, quizzes, and games to keep learning engaging",
//   },
//   {
//     icon: "☁️",
//     title: "Cloud Sync",
//     description:
//       "Access your flashcards anywhere with automatic synchronization across all devices",
//   },
//   {
//     icon: "🤝",
//     title: "Collaboration",
//     description:
//       "Share and collaborate on flashcard sets with classmates, friends, or team members",
//   },
//   {
//     icon: "🎨",
//     title: "Customization",
//     description:
//       "Personalize your learning experience with custom themes, fonts, and study preferences",
//   },
// ];

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "Medical Student",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
//     content:
//       "This platform has revolutionized my study routine. The spaced repetition feature helped me ace my medical exams!",
//   },
//   {
//     id: 2,
//     name: "David Chen",
//     role: "Language Teacher",
//     avatar:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//     content:
//       "The collaboration features are amazing. My students love creating and sharing flashcards with each other.",
//   },
//   {
//     id: 3,
//     name: "Emily Rodriguez",
//     role: "High School Student",
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
//     content:
//       "I went from struggling with vocabulary to being top of my class. The progress tracking keeps me motivated!",
//   },
// ];

const MembershipPage: React.FC = () => {
  const billingCycle = "monthly";
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredPlans = membershipPlans.filter(
    (plan) =>
      plan.id === "free" || plan.id === "team" || plan.duration === billingCycle
  );

  const handlePlanSelect = async (planId: string) => {
    if (planId === "free") return;

    setSelectedPlan(planId);
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setSelectedPlan(null);

    // Show success message or redirect
    alert("Payment processed successfully! Welcome to your new plan.");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="membership-page">
      {/* Header */}
      <header className="membership-header">
        <div className="header-content">
          <h1 className="page-title" style={{ color: "white" }}>
            Choose Your Learning Journey
          </h1>
          <p className="page-subtitle">
            Unlock your full potential with our premium features designed to
            accelerate your learning
          </p>
        </div>
      </header>

      {/* Pricing Plans */}
      <section className="pricing-section">
        <div className="pricing-container">
          <div className="pricing-grid">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.isPopular ? "popular" : ""} ${
                  plan.isCurrentPlan ? "current" : "current"
                }`}
              >
                {plan.badge && <div className="plan-badge">{plan.badge}</div>}
                {plan.isPopular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price">
                    <span className="price-amount">
                      {formatPrice(plan.price)}
                    </span>
                    {plan.price > 0 && (
                      <span className="price-period">
                        /{plan.duration === "yearly" ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="original-price">
                      <span>Regular: {formatPrice(plan.originalPrice)}</span>
                    </div>
                  )}
                  <p className="plan-description">{plan.description}</p>
                </div>

                <div className="plan-features">
                  <ul>
                    {plan.features.map((feature, index) => (
                      <li key={index}>
                        <svg
                          className="check-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="plan-footer">
                  {plan.isCurrentPlan ? (
                    <button className="plan-button current" disabled>
                      Current Plan
                    </button>
                  ) : (
                    <button
                      className={`plan-button ${
                        plan.isPopular ? "popular" : ""
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                      disabled={isProcessing && selectedPlan === plan.id}
                    >
                      {isProcessing && selectedPlan === plan.id ? (
                        <>
                          <div className="loading-spinner"></div>
                          Processing...
                        </>
                      ) : plan.price === 0 ? (
                        "Get Started Free"
                      ) : (
                        "Upgrade Now"
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>
              Discover the features that make learning more effective and
              enjoyable
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>
              Join thousands of satisfied learners who have transformed their
              study experience
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>"{testimonial.content}"</p>
                </div>
                <div className="testimonial-author">
                  <img
                    src={
                      testimonial.avatar ||
                      "/placeholder.svg?height=50&width=50"
                    }
                    alt={testimonial.name}
                    className="author-avatar"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Everything you need to know about our membership plans</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change my plan anytime?</h3>
              <p>
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>
                We offer a generous free plan with basic features. You can also
                try Pro features with our 14-day free trial.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>
                You can cancel your subscription at any time. You'll continue to
                have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Transform Your Learning?</h2>
          <p>
            Join thousands of learners who have already upgraded their study
            experience
          </p>
          <button
            className="cta-button"
            onClick={() => handlePlanSelect("pro-monthly")}
          >
            Start Your Journey Today
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default MembershipPage;
