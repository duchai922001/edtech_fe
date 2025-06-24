import type React from "react";
import { useState } from "react";
import { Clock, BookOpen, Globe, RotateCcw } from "lucide-react";
import "./eventpage.css";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";
import { useGetMocktestsChineseEvent } from "../../hooks/useMocktestChinese";
import Loading from "../../components/base/Loading";

// Mock data for tests
// const mockTests = [
//   {
//     id: 1,
//     title: "HSK Mock test",
//     subTitle: "Complete practice test with detailed explanations and scoring",
//     language: "Chinese",
//     duration: "60 minutes",
//     attempts: 3,
//     grade: "Grade 12",
//     status: "Available",
//     difficulty: "Advanced",
//   },
//   {
//     id: 2,
//     title: "TOEFL iBT Speaking Section",
//     subTitle: "Comprehensive speaking test with AI-powered feedback",
//     language: "English",
//     duration: "20 minutes",
//     attempts: 5,
//     grade: "University",
//     status: "Available",
//     difficulty: "Intermediate",
//   },
//   {
//     id: 3,
//     title: "HSK Level 5 Chinese Proficiency",
//     subTitle: "Standard Chinese language proficiency examination",
//     language: "Chinese",
//     duration: "125 minutes",
//     attempts: 2,
//     grade: "Advanced",
//     status: "Coming Soon",
//     difficulty: "Advanced",
//   }
// ];

// Pure CSS Components
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm";
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled}
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { data: mocktestData } = useGetMocktestsChineseEvent({
    page: 1,
    limit: pageSize,
  });

  console.log("mockTests", mocktestData);

  if (!mocktestData) {
    return <Loading />;
  }

  const mocktests = mocktestData?.data.data || [];
  // const total = mocktestData?.total || 0;
  // const totalPages = Math.ceil(total / pageSize);

  // Filter tests based on search and filters
  // const filteredTests = mockTests.filter((test: any) => {
  //   const matchesSearch =
  //     test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     test.subTitle.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesLanguage =
  //     selectedLanguage === "All" || test.language === selectedLanguage;
  //   const matchesGrade =
  //     selectedGrade === "All" || test.grade === selectedGrade;

  //   return matchesSearch && matchesLanguage && matchesGrade;
  // });

  // const filteredTests = mocktests.data.filter((test: any) =>
  //   test.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const languages = [
  //   "All",
  //   ...Array.from(new Set(mockTests.map((test: any) => test.language))),
  // ];
  // const grades = [
  //   "All",
  //   ...Array.from(new Set(mockTests.map((test: any) => test.grade))),
  // ];

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* <div className="filter-group">
            <Filter className="filter-icon" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="filter-select"
            >
              {languages.map((lang: any) => (
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
              {grades.map((grade: any) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div> */}
        </div>
      </section>

      {/* Test Grid */}
      <main className="main-content">
        <div className="tests-grid">
          {mocktests.map((test: any) => (
            <Card key={test._id} className="test-card">
              <div className="test-card-header">
                <div className="test-status">
                  <Badge variant={"success"}>
                    {/* {test.status} */}
                    Available
                  </Badge>
                  <Badge variant="secondary" className="difficulty-badge">
                    {/* {test.difficulty} */}
                    Advance
                  </Badge>
                </div>
              </div>

              <div className="test-card-content">
                <h3 className="test-title">{test.title}</h3>
                <p className="test-subtitle">
                  Complete practice test with detailed explanations and scoring
                </p>

                <div className="test-details">
                  <div className="detail-row">
                    <div className="detail-item">
                      <Globe className="detail-icon" />
                      <span className="detail-label">Language:</span>
                      <span className="detail-value">Chinese</span>
                    </div>
                    <div className="detail-item">
                      <BookOpen className="detail-icon" />
                      <span className="detail-label">Grade:</span>
                      <span className="detail-value">All level</span>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">60 mins</span>
                    </div>
                    <div className="detail-item">
                      <RotateCcw className="detail-icon" />
                      <span className="detail-label">Attempts:</span>
                      <span className="detail-value">1 time</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="test-card-footer">
                <Button
                  variant={"default"}
                  className="test-button"
                  onClick={() => {
                    navigate(`${Menu.URL_EVENT}/detail/${test._id}`);
                  }}
                >
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="preview-button"
                  onClick={() => {
                    navigate(`${Menu.URL_EVENT}/detail/${test._id}`);
                  }}
                  disabled={true}
                >
                  Goodluck!
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {mocktests.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3 className="no-results-title">No tests found</h3>
            <p className="no-results-text">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <div
          id="results-info"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Displaying {mocktests.length} of {total} mocktest
          {total !== 1 ? "s" : ""}, page {currentPage} of {totalPages}.
        </div> */}
      </main>
    </div>
  );
}

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   const maxButtons = 5;
//   let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
//   let endPage = Math.min(totalPages, startPage + maxButtons - 1);
//   startPage = Math.max(1, endPage - maxButtons + 1);

//   return (
//     <div
//       className="pagination"
//       style={{ marginTop: "6rem" }}
//       role="navigation"
//       aria-label="Pagination navigation"
//     >
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage <= 1}
//         aria-label="Previous page"
//       >
//         ‹ Prev
//       </button>
//       {Array.from(
//         { length: endPage - startPage + 1 },
//         (_, i) => i + startPage
//       ).map((num) => (
//         <button
//           key={num}
//           disabled={num === currentPage}
//           onClick={() => onPageChange(num)}
//           aria-current={num === currentPage ? "page" : undefined}
//           aria-label={`Page ${num}`}
//         >
//           {num}
//         </button>
//       ))}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage >= totalPages}
//         aria-label="Next page"
//       >
//         Next ›
//       </button>
//     </div>
//   );
// };
