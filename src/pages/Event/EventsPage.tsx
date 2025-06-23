import type React from "react";
import { useState } from "react";
import { Clock, BookOpen, Globe, RotateCcw, Filter } from "lucide-react";
import "./eventpage.css";

// Mock data for tests
const mockTests = [
  {
    id: 1,
    title: "HSK Mock test",
    subTitle: "Complete practice test with detailed explanations and scoring",
    language: "Chinese",
    duration: "60 minutes",
    attempts: 3,
    grade: "Grade 12",
    status: "Available",
    difficulty: "Advanced",
  },
  // {
  //   id: 2,
  //   title: "TOEFL iBT Speaking Section",
  //   subTitle: "Comprehensive speaking test with AI-powered feedback",
  //   language: "English",
  //   duration: "20 minutes",
  //   attempts: 5,
  //   grade: "University",
  //   status: "Available",
  //   difficulty: "Intermediate",
  // },
  // {
  //   id: 3,
  //   title: "HSK Level 5 Chinese Proficiency",
  //   subTitle: "Standard Chinese language proficiency examination",
  //   language: "Chinese",
  //   duration: "125 minutes",
  //   attempts: 2,
  //   grade: "Advanced",
  //   status: "Coming Soon",
  //   difficulty: "Advanced",
  // },
  // {
  //   id: 4,
  //   title: "JLPT N3 Japanese Language Test",
  //   subTitle: "Japanese Language Proficiency Test - Intermediate level",
  //   language: "Japanese",
  //   duration: "140 minutes",
  //   attempts: 3,
  //   grade: "Intermediate",
  //   status: "Available",
  //   difficulty: "Intermediate",
  // },
  // {
  //   id: 5,
  //   title: "DELF B2 French Examination",
  //   subTitle: "Diplôme d'études en langue française - Upper intermediate",
  //   language: "French",
  //   duration: "150 minutes",
  //   attempts: 2,
  //   grade: "Grade 11-12",
  //   status: "Available",
  //   difficulty: "Intermediate",
  // },
  // {
  //   id: 6,
  //   title: "SAT Math Practice Test",
  //   subTitle: "College admission test - Mathematics section with calculator",
  //   language: "English",
  //   duration: "80 minutes",
  //   attempts: 4,
  //   grade: "Grade 11-12",
  //   status: "Available",
  //   difficulty: "Advanced",
  // },
];

// Pure CSS Components
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm";
  onClick?: () => void;
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

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
  return <input className={`input ${className}`} {...props} />;
};

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const Badge = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "secondary";
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>{children}</span>
  );
};

export default function MockTestPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");

  // Filter tests based on search and filters
  const filteredTests = mockTests.filter((test) => {
    const matchesSearch =
      test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "All" || test.language === selectedLanguage;
    const matchesGrade =
      selectedGrade === "All" || test.grade === selectedGrade;

    return matchesSearch && matchesLanguage && matchesGrade;
  });

  const languages = [
    "All",
    ...Array.from(new Set(mockTests.map((test) => test.language))),
  ];
  const grades = [
    "All",
    ...Array.from(new Set(mockTests.map((test) => test.grade))),
  ];

  return (
    <div className="mock-test-page">
      {/* Header */}
      {/* <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Mock Test Library</h1>
            <p className="page-subtitle">
              Practice with our comprehensive collection of language and
              academic tests
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-number">{mockTests.length}</span>
              <span className="stat-label">Total Tests</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{languages.length - 1}</span>
              <span className="stat-label">Languages</span>
            </div>
          </div>
        </div>
      </header> */}
      <header className="fc-exp-header">
        <div className="fc-exp-logo" style={{ paddingLeft: "10rem" }}>
          Edtech events
        </div>
      </header>

      {/* Filters */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="search-box">
            <Input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="filter-select"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="filter-select"
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Test Grid */}
      <main className="main-content">
        <div className="tests-grid">
          {filteredTests.map((test) => (
            <Card key={test.id} className="test-card">
              <div className="test-card-header">
                <div className="test-status">
                  <Badge
                    variant={
                      test.status === "Available" ? "success" : "warning"
                    }
                  >
                    {test.status}
                  </Badge>
                  <Badge variant="secondary" className="difficulty-badge">
                    {test.difficulty}
                  </Badge>
                </div>
              </div>

              <div className="test-card-content">
                <h3 className="test-title">{test.title}</h3>
                <p className="test-subtitle">{test.subTitle}</p>

                <div className="test-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <Globe className="detail-icon" />
                      <span className="detail-label">Language:</span>
                      <span className="detail-value">{test.language}</span>
                    </div>
                    <div className="detail-item">
                      <BookOpen className="detail-icon" />
                      <span className="detail-label">Grade:</span>
                      <span className="detail-value">{test.grade}</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{test.duration}</span>
                    </div>
                    <div className="detail-item">
                      <RotateCcw className="detail-icon" />
                      <span className="detail-label">Attempts:</span>
                      <span className="detail-value">
                        {test.attempts} times
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="test-card-footer">
                <Button
                  variant={test.status === "Available" ? "default" : "outline"}
                  className="test-button"
                  onClick={() => console.log(`Starting test: ${test.title}`)}
                >
                  {test.status === "Available" ? "Start Test" : "Coming Soon"}
                </Button>
                <Button variant="outline" size="sm" className="preview-button">
                  Preview
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3 className="no-results-title">No tests found</h3>
            <p className="no-results-text">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
