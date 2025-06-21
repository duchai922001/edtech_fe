import type React from "react";
import { useState, useEffect } from "react";
import "./style.css";

interface Scholarship {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  description: string;
  requirements: string[];
  type: "Full" | "Partial" | "Merit" | "Need-based";
  level: "Undergraduate" | "Graduate" | "PhD" | "All";
  country: string;
  imageUrl: string;
  applicationUrl: string;
  tags: string[];
  isActive: boolean;
}

// Mock data
const mockScholarships: Scholarship[] = [
  {
    id: "1",
    title: "Global Excellence Scholarship",
    organization: "International Education Foundation",
    amount: "$50,000",
    deadline: "2024-03-15",
    description:
      "A prestigious scholarship program for outstanding international students pursuing higher education. This scholarship covers full tuition fees and provides additional support for living expenses.",
    requirements: [
      "GPA of 3.8 or higher",
      "TOEFL score of 100+ or IELTS 7.0+",
      "Leadership experience",
      "Community service involvement",
    ],
    type: "Full",
    level: "Graduate",
    country: "United States",
    imageUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["International", "STEM", "Leadership"],
    isActive: true,
  },
  {
    id: "2",
    title: "Future Leaders Merit Award",
    organization: "Tech Innovation Institute",
    amount: "$25,000",
    deadline: "2024-04-20",
    description:
      "Supporting the next generation of technology leaders with partial funding for computer science and engineering programs.",
    requirements: [
      "Major in Computer Science or Engineering",
      "GPA of 3.5 or higher",
      "Portfolio of projects",
      "Two recommendation letters",
    ],
    type: "Partial",
    level: "Undergraduate",
    country: "Canada",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Technology", "Innovation", "STEM"],
    isActive: true,
  },
  {
    id: "3",
    title: "Research Excellence Grant",
    organization: "National Science Foundation",
    amount: "$75,000",
    deadline: "2024-02-28",
    description:
      "Comprehensive funding for PhD students conducting groundbreaking research in natural sciences and mathematics.",
    requirements: [
      "Enrolled in PhD program",
      "Research proposal required",
      "Academic supervisor endorsement",
      "Previous research experience",
    ],
    type: "Full",
    level: "PhD",
    country: "United Kingdom",
    imageUrl:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Research", "Science", "PhD"],
    isActive: true,
  },
  {
    id: "4",
    title: "Diversity & Inclusion Scholarship",
    organization: "Global University Alliance",
    amount: "$30,000",
    deadline: "2024-05-10",
    description:
      "Promoting diversity in higher education by supporting underrepresented students in their academic journey.",
    requirements: [
      "Demonstrate financial need",
      "Essay on diversity impact",
      "GPA of 3.0 or higher",
      "Community involvement",
    ],
    type: "Need-based",
    level: "All",
    country: "Australia",
    imageUrl:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Diversity", "Inclusion", "Community"],
    isActive: true,
  },
  {
    id: "5",
    title: "Green Innovation Award",
    organization: "Environmental Studies Institute",
    amount: "$40,000",
    deadline: "2024-06-30",
    description:
      "Supporting students passionate about environmental sustainability and green technology solutions.",
    requirements: [
      "Environmental Science major",
      "Sustainability project portfolio",
      "GPA of 3.6 or higher",
      "Environmental activism experience",
    ],
    type: "Merit",
    level: "Graduate",
    country: "Germany",
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Environment", "Sustainability", "Innovation"],
    isActive: true,
  },
  {
    id: "6",
    title: "Arts & Culture Fellowship",
    organization: "Creative Arts Foundation",
    amount: "$20,000",
    deadline: "2024-04-15",
    description:
      "Nurturing creative talents in visual arts, music, theater, and digital media through comprehensive funding support.",
    requirements: [
      "Arts or Creative major",
      "Portfolio submission",
      "Performance or exhibition history",
      "Artist statement required",
    ],
    type: "Partial",
    level: "Undergraduate",
    country: "France",
    imageUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Arts", "Culture", "Creative"],
    isActive: true,
  },
  {
    id: "7",
    title: "Business Leadership Excellence",
    organization: "International Business School",
    amount: "$60,000",
    deadline: "2024-03-31",
    description:
      "Developing future business leaders through comprehensive MBA funding and mentorship programs.",
    requirements: [
      "MBA program enrollment",
      "5+ years work experience",
      "GMAT score of 650+",
      "Leadership portfolio",
    ],
    type: "Full",
    level: "Graduate",
    country: "Singapore",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Business", "Leadership", "MBA"],
    isActive: true,
  },
  {
    id: "8",
    title: "Medical Research Grant",
    organization: "Health Sciences Institute",
    amount: "$80,000",
    deadline: "2024-05-25",
    description:
      "Supporting medical students and researchers working on innovative healthcare solutions and medical breakthroughs.",
    requirements: [
      "Medical or Health Sciences major",
      "Research experience required",
      "GPA of 3.7 or higher",
      "Faculty recommendation",
    ],
    type: "Full",
    level: "Graduate",
    country: "Switzerland",
    imageUrl:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    applicationUrl: "https://example.com/apply",
    tags: ["Medical", "Research", "Healthcare"],
    isActive: true,
  },
];

const ScholarshipPage: React.FC = () => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [filteredScholarships, setFilteredScholarships] = useState<
    Scholarship[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    type: "All",
    level: "All",
    country: "All",
    search: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 6;

  // Simulate API call
  useEffect(() => {
    const loadScholarships = async () => {
      setIsLoading(true);
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setScholarships(mockScholarships);
      setFilteredScholarships(mockScholarships);
      setIsLoading(false);
    };

    loadScholarships();
  }, []);

  // Filter scholarships
  useEffect(() => {
    const filtered = scholarships.filter((scholarship) => {
      const matchesType =
        filters.type === "All" || scholarship.type === filters.type;
      const matchesLevel =
        filters.level === "All" || scholarship.level === filters.level;
      const matchesCountry =
        filters.country === "All" || scholarship.country === filters.country;
      const matchesSearch =
        filters.search === "" ||
        scholarship.title
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        scholarship.organization
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        scholarship.tags.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase())
        );

      return matchesType && matchesLevel && matchesCountry && matchesSearch;
    });

    setFilteredScholarships(filtered);
    setCurrentPage(1);
  }, [filters, scholarships]);

  // Pagination
  const totalPages = Math.ceil(filteredScholarships.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentScholarships = filteredScholarships.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays <= 7) return `${diffDays} days left`;
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Full":
        return "type-full";
      case "Partial":
        return "type-partial";
      case "Merit":
        return "type-merit";
      case "Need-based":
        return "type-need";
      default:
        return "type-default";
    }
  };

  if (isLoading) {
    return (
      <div className="scholarship-page">
        <div className="scholarship-loading">
          <div className="loading-spinner"></div>
          <p>Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scholarship-page">
      {/* Header */}
      <header className="scholarship-header">
        <div className="header-content">
          <h1 className="page-title">Scholarship Opportunities</h1>
          <p className="page-subtitle">
            Discover funding opportunities to support your educational journey
          </p>
          {/* <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">{scholarships.length}</span>
              <span className="stat-label">Total Scholarships</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{filteredScholarships.length}</span>
              <span className="stat-label">Available Now</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$2.5M+</span>
              <span className="stat-label">Total Funding</span>
            </div>
          </div> */}
        </div>
      </header>

      {/* Filters */}
      <section className="scholarship-filters">
        <div className="filters-container">
          <div className="search-box">
            {/* <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg> */}
            <input
              type="text"
              placeholder="Search scholarships..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="search-input"
            />
          </div>

          {/* <div className="filter-group">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="filter-select"
            >
              <option value="All">All Types</option>
              <option value="Full">Full Scholarship</option>
              <option value="Partial">Partial Scholarship</option>
              <option value="Merit">Merit-based</option>
              <option value="Need-based">Need-based</option>
            </select>

            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="filter-select"
            >
              <option value="All">All Levels</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="PhD">PhD</option>
            </select>

            <select
              value={filters.country}
              onChange={(e) => handleFilterChange("country", e.target.value)}
              className="filter-select"
            >
              <option value="All">All Countries</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Singapore">Singapore</option>
              <option value="Switzerland">Switzerland</option>
            </select>
          </div> */}
        </div>
      </section>

      {/* Results */}
      <main className="scholarship-main">
        {filteredScholarships.length === 0 ? (
          <div className="no-results">
            <svg
              className="no-results-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <h3>No scholarships found</h3>
            <p>Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <>
            <div className="results-header">
              <p className="results-count">
                Showing {startIndex + 1}-
                {Math.min(
                  startIndex + itemsPerPage,
                  filteredScholarships.length
                )}{" "}
                of {filteredScholarships.length} scholarships
              </p>
            </div>

            <div className="scholarship-grid">
              {currentScholarships.map((scholarship) => (
                <article key={scholarship.id} className="scholarship-card">
                  <div className="card-image">
                    <img
                      src={scholarship.imageUrl || "/placeholder.svg"}
                      alt={scholarship.title}
                    />
                    <div className="card-badges">
                      <span
                        className={`type-badge ${getTypeColor(
                          scholarship.type
                        )}`}
                      >
                        {scholarship.type}
                      </span>
                      <span className="level-badge">{scholarship.level}</span>
                    </div>
                  </div>

                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="card-title">{scholarship.title}</h3>
                      <p className="card-organization">
                        {scholarship.organization}
                      </p>
                    </div>

                    <div className="card-details">
                      <div className="detail-row">
                        <svg
                          className="detail-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span className="amount">{scholarship.amount}</span>
                      </div>

                      <div className="detail-row">
                        <svg
                          className="detail-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span className="deadline">
                          {formatDeadline(scholarship.deadline)}
                        </span>
                      </div>

                      <div className="detail-row">
                        <svg
                          className="detail-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span className="country">{scholarship.country}</span>
                      </div>
                    </div>

                    <p className="card-description">
                      {scholarship.description}
                    </p>

                    <div className="card-tags">
                      {scholarship.tags.map((tag, index) => (
                        <span key={index} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="card-requirements">
                      <h4>Key Requirements:</h4>
                      <ul>
                        {scholarship.requirements
                          .slice(0, 2)
                          .map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        {scholarship.requirements.length > 2 && (
                          <li className="more-requirements">
                            +{scholarship.requirements.length - 2} more
                            requirements
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button
                      className="apply-btn"
                      onClick={() =>
                        window.open(scholarship.applicationUrl, "_blank")
                      }
                    >
                      <svg
                        className="btn-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M7 17L17 7"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                      Apply Now
                    </button>
                    <button className="details-btn">View Details</button>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-container">
                <nav
                  className="pagination"
                  role="navigation"
                  aria-label="Pagination"
                  style={{ marginTop: "3rem" }}
                >
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    aria-label="Previous page"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                    Previous
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`pagination-number ${
                            currentPage === page ? "active" : ""
                          }`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    aria-label="Next page"
                  >
                    Next
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default ScholarshipPage;
