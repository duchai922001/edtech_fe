import React, { useState } from "react";
import "./style.css";

interface MockTest {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  language: string;
}

const mockTestsData: MockTest[] = [
  {
    id: 1,
    title: "JavaScript Fundamentals Mock Test",
    description: "Test your knowledge on fundamental JavaScript concepts.",
    questionsCount: 40,
    durationMinutes: 60,
    language: "English",
  },
  {
    id: 2,
    title: "Advanced CSS Mock Test",
    description: "Assess your advanced CSS skills including Flexbox and Grid.",
    questionsCount: 30,
    durationMinutes: 45,
    language: "English",
  },
  {
    id: 3,
    title: "Python Data Science Mock Test",
    description:
      "Evaluate your proficiency in Python for data science applications.",
    questionsCount: 50,
    durationMinutes: 90,
    language: "English",
  },
  {
    id: 4,
    title: "HTML5 Basics Mock Test",
    description:
      "Test understanding of HTML5 semantic elements and best practices.",
    questionsCount: 25,
    durationMinutes: 40,
    language: "English",
  },
  {
    id: 5,
    title: "SQL Queries Mock Test",
    description:
      "Challenge your knowledge on SQL query writing and optimization.",
    questionsCount: 35,
    durationMinutes: 50,
    language: "English",
  },
  {
    id: 6,
    title: "Vietnamese Language Mock Test",
    description: "Test your vocabulary and grammar in Vietnamese.",
    questionsCount: 45,
    durationMinutes: 70,
    language: "Vietnamese",
  },
];

const MockTest: React.FC = () => {
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTests = mockTestsData.filter((test) => {
    const matchesLanguage =
      languageFilter === "All" || test.language === languageFilter;
    const matchesSearch =
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLanguage && matchesSearch;
  });

  setLanguageFilter("All");

  return (
    <div className="mocktests-container">
      <header className="mocktests-header" tabIndex={0}>
        <h1>Mock Tests</h1>
      </header>

      <section className="mocktests-filters" aria-label="Mock test filters">
        <input
          type="search"
          aria-label="Search mock tests"
          placeholder="Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mocktests-search"
        />
        <button
          className="mocktests-btn "
          onClick={() => {
            // navigate(Menu.URL_CREATE_FLASHCARD_PAGE);
          }}
        >
          Search
        </button>
      </section>

      <main
        className="mocktests-main"
        tabIndex={-1}
        aria-live="polite"
        aria-label="Available mock tests"
      >
        {filteredTests.length === 0 ? (
          <p className="mocktests-empty">No mock tests found.</p>
        ) : (
          <div className="mocktests-grid">
            {filteredTests.map((test) => (
              <article
                key={test.id}
                className="mocktest-card"
                tabIndex={0}
                aria-describedby={`desc-${test.id}`}
              >
                <h2 className="mocktest-title">{test.title}</h2>
                <p className="mocktest-desc">{test.description}</p>
                <div className="mocktest-meta">
                  <span>{test.questionsCount} questions</span>
                  <span>{test.durationMinutes} minutes</span>
                  <span>{test.language}</span>
                </div>
                <p id={`desc-${test.id}`} className="sr-only">
                  {test.title} with {test.questionsCount} questions. Duration{" "}
                  {test.durationMinutes} minutes. Language: {test.language}.
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MockTest;
