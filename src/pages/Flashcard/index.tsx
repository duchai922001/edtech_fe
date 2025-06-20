import React, { useState, useEffect } from "react";
import "./style.css";
import { Col, Row } from "antd";
import { useGetLanguages } from "../../hooks/useLanguage";
import { useGetMyFlashcards, useGetFlashCards } from "../../hooks/useFlashCard";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../common/configMenu";
import { useFavoriteFlashcard } from "../../hooks/useFlashCard";

interface Flashcard {
  _id: string;
  title: string;
  language: string;
  isFavorite: boolean;
  front?: string;
  back?: string;
}

interface FlashcardCollection {
  _id: string;
  title: string;
  backgroundImage: string;
  createdAt: string;
  languageId: {
    name: string;
  };
  flashcards: Flashcard[];
}

interface Category {
  name: string;
  code: string;
  id?: string;
}

const userId = localStorage.getItem("userId") ?? "";

const FlashcardCollectionExperimental: React.FC = () => {
  const [view, setView] = useState<"my" | "explore" | "favourite">("my");
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const favoriteMutation = useFavoriteFlashcard();

  const {
    data: languages,
    isLoading: isLangLoading,
    isError: isLangError,
  } = useGetLanguages();

  const categoriesData: Category[] = languages
    ? languages.map((lang: { name: string; code: string; _id?: string }) => ({
        name: lang.name,
        code: lang.code,
        id: lang._id,
      }))
    : [];

  // MY view
  const {
    data: myFlashcards = [],
    isLoading: isMyLoading,
    isError: isMyError,
  } = useGetMyFlashcards(userId);

  const filteredMyFlashcards = myFlashcards.filter(
    (card: any) =>
      (languageFilter === "All" || card.languageId.name === languageFilter) &&
      (view !== "favourite" || card.isFavorite)
  );

  const paginatedMyFlashcards = filteredMyFlashcards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // EXPLORE view
  const languageId =
    languageFilter === "All"
      ? undefined
      : categoriesData.find((c) => c.name === languageFilter)?.id ?? "";
  const {
    data: exploreData,
    isLoading: isExploreLoading,
    isError: isExploreError,
  } = useGetFlashCards({
    page: currentPage,
    limit: 8,
    languageId: languageFilter === "All" ? undefined : languageId,
  });
  console.log(exploreData);

  const exploreFlashcards: FlashcardCollection[] = Array.isArray(
    exploreData?.data
  )
    ? exploreData.data
    : [];
  const exploreTotal: number = exploreData?.total || 0;

  useEffect(() => {
    setCurrentPage(1);
  }, [languageFilter, view]);

  const isLoading = view === "explore" ? isExploreLoading : isMyLoading;
  const isError = view === "explore" ? isExploreError : isMyError;
  const totalPages =
    view === "explore"
      ? Math.ceil(exploreTotal / pageSize)
      : Math.ceil(filteredMyFlashcards.length / pageSize);

  const flashcardsToRender =
    view === "explore" ? exploreFlashcards : paginatedMyFlashcards;
  const navigate = useNavigate();

  return (
    <div className="fc-experimental-app">
      <header className="fc-exp-header">
        <div className="fc-exp-logo">Edtech Flashcards</div>
      </header>

      <section className="fc-exp-toolbar">
        <Col>
          <Row>
            <nav className="fc-exp-tabs">
              {(["my", "favourite", "explore"] as const).map((v) => (
                <button
                  key={v}
                  className={`fc-exp-tab ${view === v ? "active" : ""}`}
                  onClick={() => setView(v)}
                >
                  {v === "my"
                    ? "My Flashcards"
                    : v === "favourite"
                    ? "My Favourites"
                    : "Explore Flashcards"}
                </button>
              ))}
            </nav>
            {view === "my" && (
              <button
                className="fc-exp-create-btn"
                onClick={() => {
                  navigate(Menu.URL_CREATE_FLASHCARD_PAGE);
                }}
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

      <main className="fc-exp-main">
        <section className="fc-exp-flashcard-grid">
          {isLoading ? (
            <p className="fc-exp-empty-state">Loading flashcards...</p>
          ) : isError ? (
            <p className="fc-exp-empty-state">Error loading flashcards</p>
          ) : flashcardsToRender.length === 0 ? (
            <p className="fc-exp-empty-state">No flashcards found.</p>
          ) : view === "explore" ? (
            flashcardsToRender.map((card: any) => (
              <article
                key={card._id}
                className="fc-exp-card"
                onClick={() => {
                  navigate(`${Menu.URL_FLASH_CARD_PAGE}/${card._id}`);
                }}
              >
                <button
                  className={`fc-exp-fav-btn ${
                    card.isFavorite ? "favorited" : ""
                  }`}
                  aria-label={
                    card.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  onClick={() =>
                    favoriteMutation.mutate({
                      flashcardId: card._id,
                      token: localStorage.getItem("token") || "",
                    })
                  }
                  disabled={favoriteMutation.isPending}
                >
                  <span className="material-icons">star</span>
                </button>
                <div className="fc-exp-card-body">
                  <h3 className="fc-exp-card-title">{card.title}</h3>
                  <div className="meta">
                    <span>{card.languageId.name}</span>
                    <span>
                      {card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </article>
            ))
          ) : (
            flashcardsToRender.map((card: any) => (
              <article
                key={card._id}
                className="fc-exp-card"
                onClick={() => {
                  navigate(`${Menu.URL_FLASH_CARD_PAGE}/${card._id}`);
                }}
              >
                <button
                  className={`fc-exp-fav-btn ${
                    card.isFavorite ? "favorited" : ""
                  }`}
                  aria-label={
                    card.isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                  onClick={() =>
                    favoriteMutation.mutate({
                      flashcardId: card._id,
                      token: localStorage.getItem("token") || "",
                    })
                  }
                  disabled={favoriteMutation.isPending}
                >
                  <span className="material-icons">star</span>
                </button>
                <div className="fc-exp-card-body">
                  <h3 className="fc-exp-card-title">{card.title}</h3>
                  <div className="meta">
                    <span>
                      {card.languageId?.name ?? card.language ?? "Unknown"}
                    </span>
                    <span>
                      {card.createdAt
                        ? new Date(card.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </span>
                  </div>
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
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        ‹ Prev
      </button>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => i + startPage
      ).map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          disabled={num === currentPage}
          aria-current={num === currentPage ? "page" : undefined}
        >
          {num}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next ›
      </button>
    </div>
  );
};

export default FlashcardCollectionExperimental;
