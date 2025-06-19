import React, { useState, useEffect } from "react";
import type { KeyboardEvent } from "react";
import "./style.css";
import { useGetLanguages } from "../../hooks/useLanguage";
import { useGetResources } from "../../hooks/useResource";

interface Document {
  id: number;
  title: string;
  description: string;
  language: string;
  filePdf: string;
  categoryIcon: string;
  createdAt: string;
}

interface Category {
  name: string;
  code: string;
  icon: string;
  id?: string;
}

const pageSize = 12;

const iconMap: Record<string, string> = {
  English: "menu_book",
  Japanese: "translate",
  Chinese: "library_books",
};

const LearningDocuments: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredDocs, setFilteredDocs] = useState<Document[]>([]);
  const [total, setTotal] = useState<number>(1);

  useEffect(() => {
    setSearchQuery("");
  }, []);
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
        icon: iconMap[lang.name] || "category",
      }))
    : [];
  // Lấy tài liệu từ API, truyền languageId nếu có chọn category
  const languageId = selectedCategory?.id;
  const {
    data: resources,
    isLoading: isResLoading,
    isError: isResError,
  } = useGetResources({ page: currentPage, limit: pageSize, languageId });

  // Fill documentData từ API mỗi khi resources thay đổi
  useEffect(() => {
    if (!resources) return;
    const docs: Document[] = resources.data.map((item: any) => ({
      id: item._id,
      title: item.title,
      filePdf: item.filePdf,
      description: item.description,
      language: item.languageId.name || item.language || "",
      categoryIcon: iconMap[item.languageId.name] || "category",
      createdAt: item.updatedAt || "",
    }));
    console.log(resources);
    setFilteredDocs(docs);
    setTotal(resources.total);
  }, [resources]);

  // Khi chọn category mới, reset về trang 1 và gọi lại API với languageId mới
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Lọc theo search (client-side)
  const searchedDocs = searchQuery.trim()
    ? filteredDocs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          doc.language.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredDocs;

  // Nếu search thì phân trang client, nếu không search thì dùng dữ liệu trang hiện tại từ API
  const totalPages = Math.max(
    1,
    Math.ceil((searchQuery ? searchedDocs.length : total) / pageSize)
  );
  const pageDocs = searchQuery
    ? searchedDocs.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredDocs;
  // Keyboard navigation on categories (numbers 1-9)
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLInputElement ||
      (event.target as HTMLElement).isContentEditable
    )
      return;
    if (event.key.match(/^[1-9]$/)) {
      const idx = parseInt(event.key, 10) - 1;
      if (idx === 0) {
        setSelectedCategory(null);
      } else if (idx <= categoriesData.length) {
        setSelectedCategory(categoriesData[idx - 1] || null);
      }
    }
  };

  return (
    <>
      <header
        role="banner"
        aria-label="Primary header navigation"
        className="header"
      >
        <div className="logo" tabIndex={0}>
          Edtech Learning
        </div>
        <nav aria-label="Primary site navigation"></nav>
      </header>
      <div
        className="app-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-live="polite"
      >
        <aside
          id="sidebar-menu"
          className="sidebar glass"
          role="navigation"
          aria-label="Document language categories"
        >
          <h2>Learning Resources</h2>
          {isLangLoading ? (
            <div>Loading categories...</div>
          ) : isLangError ? (
            <div>Error loading categories</div>
          ) : (
            <ul className="category-list" role="list">
              <li
                role="listitem"
                tabIndex={0}
                aria-selected={selectedCategory === null}
                onClick={() => setSelectedCategory(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedCategory(null);
                  }
                }}
                className={
                  selectedCategory === null ? "category-selected" : undefined
                }
              >
                <span
                  className="material-icons"
                  aria-hidden="true"
                  aria-label=""
                >
                  category
                </span>
                <span>All Languages</span>
              </li>
              {categoriesData.map(({ name, icon, code, id }) => (
                <li
                  key={code}
                  role="listitem"
                  tabIndex={0}
                  aria-selected={selectedCategory?.code === code}
                  onClick={() => {
                    setSelectedCategory({ name, code, icon, id });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedCategory({ name, code, icon, id });
                    }
                  }}
                  className={
                    selectedCategory?.code === code ? "category-selected" : ""
                  }
                >
                  <span
                    className="material-icons"
                    aria-hidden="true"
                    aria-label=""
                  >
                    {icon}
                  </span>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
        <main role="main" className="content-area" tabIndex={-1}>
          <section
            aria-live="polite"
            aria-relevant="additions removals"
            aria-atomic="true"
            aria-label="List of learning documents"
          >
            <div
              className="documents-grid"
              role="list"
              tabIndex={-1}
              aria-describedby="results-info"
            >
              {isResLoading ? (
                <p>Loading documents...</p>
              ) : isResError ? (
                <p>Error loading documents</p>
              ) : pageDocs.length === 0 ? (
                <p
                  style={{
                    color: "#679f53",
                    fontWeight: 600,
                    fontSize: "1.1rem",
                    gridColumn: "1/-1",
                  }}
                >
                  No documents found for your search or filters.
                </p>
              ) : (
                pageDocs.map((doc) => (
                  <article
                    key={doc.id}
                    onClick={() => {
                      window.location.href = doc.filePdf;
                    }}
                    className="document-card"
                    tabIndex={0}
                    role="listitem"
                    aria-label={`${doc.title}, language: ${
                      doc.language
                    }, published on ${new Date(
                      doc.createdAt
                    ).toLocaleDateString()}`}
                  >
                    <h3>{doc.title}</h3>
                    <p className="desc">{doc.description}</p>
                    <div className="meta">
                      <span
                        className="material-icons"
                        aria-hidden="true"
                        style={{ fontSize: "20px", verticalAlign: "middle" }}
                      >
                        {doc.categoryIcon}
                      </span>{" "}
                      <span>{doc.language}</span>
                      <span>
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </article>
                ))
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
              Displaying {pageDocs.length} of{" "}
              {searchQuery ? searchedDocs.length : total} document
              {(searchQuery ? searchedDocs.length : total) !== 1 ? "s" : ""},
              page {currentPage} of {totalPages}.
            </div>
          </section>
        </main>
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

export default LearningDocuments;
