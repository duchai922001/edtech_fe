import React, { useState, useEffect } from "react";
import "./style.css";
import { Col, Row } from "antd";
import { useGetLanguages } from "../../hooks/useLanguage";
import { useGetMyFlashcards } from "../../hooks/useFlashCard";

interface Flashcard {
  id: number;
  title: string;
  language: string;
  isFavorite: boolean;
}

interface FlashcardItem {
  _id: string;
  title: string;
}

interface FlashcardCollection {
  _id: string;
  title: string;
  backgroundImage: string;
  createdAt: string;
  languageId: {
    name: string;
  };
  flashcards: FlashcardItem[];
}

interface Category {
  name: string;
  code: string;
  id?: string;
}

const userId = localStorage.getItem("userId") ?? "";

const FlashcardCollectionExperimental: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [view, setView] = useState<"my" | "explore" | "favourite">("my");
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const {
    data: flashcards = [],
    isLoading: isFlashcardLoading,
    isError: isFlashcardError,
  } = useGetMyFlashcards(userId);

  // Lấy danh sách ngôn ngữ từ API
  const {
    data: languages,
    isLoading: isLangLoading,
    isError: isLangError,
  } = useGetLanguages();

  // Tạo categories từ API
  const categoriesData: Category[] = languages
    ? languages.map((lang: { name: string; code: string; _id?: string }) => ({
        name: lang.name,
        code: lang.code,
        id: lang._id,
      }))
    : [];

  const filteredFlashcards = flashcards.filter(
    (card: any) => languageFilter === "All" || card.language === languageFilter
  );
  console.log(filteredFlashcards);

  const totalPages = Math.ceil(filteredFlashcards.length / pageSize);

  const paginatedFlashcards = filteredFlashcards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [languageFilter, view]);

  // const toggleFavorite = (id: number) => {
  //   setFlashcards((cards) =>
  //     cards.map((card) =>
  //       card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
  //     )
  //   );
  // };

  return (
    <>
      <div className="fc-experimental-app">
        {/* Top Header with brand */}
        <header className="fc-exp-header">
          <div className="fc-exp-logo" tabIndex={0}>
            Edtech Flashcards
          </div>
        </header>

        {/* Sticky toolbar with filter & actions */}
        <section
          className="fc-exp-toolbar"
          role="toolbar"
          aria-label="Flashcard controls"
        >
          <Col>
            <Row>
              <nav
                className="fc-exp-tabs"
                role="tablist"
                aria-label="Flashcard view selection"
              >
                <button
                  role="tab"
                  aria-selected={view === "my"}
                  className={`fc-exp-tab ${view === "my" ? "active" : ""}`}
                  onClick={() => setView("my")}
                >
                  My Flashcards
                </button>
                <button
                  role="tab"
                  aria-selected={view === "favourite"}
                  className={`fc-exp-tab ${
                    view === "favourite" ? "active" : ""
                  }`}
                  onClick={() => setView("favourite")}
                >
                  My Favourites
                </button>
                <button
                  role="tab"
                  aria-selected={view === "explore"}
                  className={`fc-exp-tab ${view === "explore" ? "active" : ""}`}
                  onClick={() => setView("explore")}
                >
                  Explore Flashcards
                </button>
              </nav>
              {view === "my" && (
                <button
                  className="fc-exp-create-btn"
                  aria-label="Create new flashcard"
                >
                  Create New Flashcard
                </button>
              )}
            </Row>
            <Row>
              <label htmlFor="fc-exp-lang-select" className="fc-exp-lang-label">
                Language:
              </label>
              {isLangLoading ? (
                <span>Loading languages...</span>
              ) : isLangError ? (
                <span>Error loading languages</span>
              ) : (
                <select
                  id="fc-exp-lang-select"
                  className="fc-exp-language-select"
                  aria-label="Select flashcard language"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                >
                  <option value="All">All</option>
                  {categoriesData.map((lang) => (
                    <option key={lang.code} value={lang.name}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              )}
            </Row>
          </Col>
        </section>

        {/* Main content: grid + sidebar */}
        <main className="fc-exp-main" tabIndex={-1}>
          <section
            className="fc-exp-flashcard-grid"
            aria-live="polite"
            aria-label="Flashcard collection"
          >
            {isFlashcardLoading ? (
              <p className="fc-exp-empty-state">Loading flashcards...</p>
            ) : isFlashcardError ? (
              <p className="fc-exp-empty-state">Error loading flashcards</p>
            ) : filteredFlashcards.length === 0 ? (
              <p className="fc-exp-empty-state">
                No flashcards match the current filters.
              </p>
            ) : (
              paginatedFlashcards.map((collection: FlashcardCollection) => (
                <article key={collection._id} className="fc-exp-card">
                  <div className="fc-exp-card-body">
                    <h3 className="fc-exp-card-title">{collection.title}</h3>
                    <div className="meta">
                      <span>{collection.languageId.name}</span>
                      <span>
                        {new Date(collection.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <ul className="fc-exp-flashcard-list">
                      {collection.flashcards?.slice(0, 5).map((item) => (
                        <li key={item._id}>• {item.title}</li>
                      ))}
                      {collection.flashcards?.length > 5 && (
                        <li>...and {collection.flashcards.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
        <div className="fc-exp-pagination-wrapper">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
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

export default FlashcardCollectionExperimental;
