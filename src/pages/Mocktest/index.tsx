import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { useGetMocktestLanguage } from "../../hooks/useMocktest";
import Loading from "../../components/base/Loading";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";

interface MockTest {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  language: string;
}

const MockTest: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { languageId } = useParams<{ languageId: string }>();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const {
    data: mocktestData,
    isLoading,
    isError,
  } = useGetMocktestLanguage({
    page: currentPage,
    limit: pageSize,
    languageId,
  });

  if (!mocktestData) {
    return <Loading />;
  }

  console.log(mocktestData);

  const mocktests = mocktestData?.data || [];
  const total = mocktestData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

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
        <div>
          {isLoading ? (
            <p>Loading mocktests...</p>
          ) : isError ? (
            <p>Error loading mocktests</p>
          ) : mocktests.length === 0 ? (
            <p>No mocktests found.</p>
          ) : (
            <div className="mocktests-grid">
              {mocktests.map((test: any) => (
                <article
                  key={test.URL_FLASH_CARD_PAGEid}
                  className="mocktest-card"
                  tabIndex={0}
                  aria-describedby={`desc-${test.id}`}
                  onClick={() => {
                    navigate(`${Menu.URL_MOCK_TEST_PAGE}/detail/${test._id}`);
                  }}
                >
                  <h2 className="mocktest-title">{test.title}</h2>
                  <p className="mocktest-desc">{test.description}</p>
                  <div className="mocktest-meta">
                    <span>{20} questions</span>
                  </div>
                  <div
                    className="mocktest-meta-language"
                    style={{ marginTop: "10px" }}
                  >
                    <span>{test.languageId.name}</span>
                  </div>
                  <p id={`desc-${test._id}`} className="sr-only">
                    {test.title} with {test.questionsCount} questions. Duration{" "}
                    {test.durationMinutes} minutes. Language: {test.language}.
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
        <Pagination
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
        </div>
      </main>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);
  startPage = Math.max(1, endPage - maxButtons + 1);

  return (
    <div
      className="pagination"
      style={{ marginTop: "6rem" }}
      role="navigation"
      aria-label="Pagination navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      ).map((num) => (
        <button
          key={num}
          disabled={num === currentPage}
          onClick={() => onPageChange(num)}
          aria-current={num === currentPage ? "page" : undefined}
          aria-label={`Page ${num}`}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
      >
        Next ›
      </button>
    </div>
  );
};

export default MockTest;
