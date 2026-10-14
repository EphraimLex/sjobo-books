import { useState } from 'react';
import books from '../data/books.json';
import BookCard from '../components/BookCard.jsx';
import { searchBooks } from '../utils/searchBooks.js';

// Maximum number of books displayed on each page.
const BOOKS_PER_PAGE = 12;

function Shop() {
  // Store the search text and the selected page.
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Search by title, author or ISBN using our utility function.
  const matchingBooks = searchBooks(books, searchQuery);

  // Calculate how many pages the matching books require.
  const totalPages = Math.ceil(
    matchingBooks.length / BOOKS_PER_PAGE
  );

  // Select only the books belonging to the current page.
  const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
  const visibleBooks = matchingBooks.slice(
    startIndex,
    startIndex + BOOKS_PER_PAGE
  );

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);

    // Return to the first page whenever the search changes.
    setCurrentPage(1);
  }

  function clearSearch() {
    setSearchQuery('');
    setCurrentPage(1);
  }

  return (
    <section>
      <h1>Shop books</h1>
      <p className="mb-4">Explore our collection.</p>

      {/* Search field with a visible, accessible label. */}
      <div className="mb-4">
        <label htmlFor="book-search" className="form-label">
          Search by title, author or ISBN
        </label>

        <div className="input-group">
          <input
            id="book-search"
            type="search"
            className="form-control"
            placeholder="Enter a title, author or complete ISBN"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-describedby="search-help"
          />

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={clearSearch}
            disabled={!searchQuery}
          >
            Clear
          </button>
        </div>

        <p id="search-help" className="form-text">
          Results update as you type. Common words such as
          “the”, “of” and “by” are ignored.
        </p>
      </div>

      {/* Screen readers announce changes to the results. */}
      <p role="status">
        {matchingBooks.length === 0
          ? 'No books found. Try another title, author or complete ISBN.'
          : `Showing ${startIndex + 1}–${Math.min(
              startIndex + BOOKS_PER_PAGE,
              matchingBooks.length
            )} of ${matchingBooks.length} books.`}
      </p>

      {/* Display 1, 2 or 3 columns depending on screen width. */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {visibleBooks.map((book) => (
          <div className="col" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>

      {/* Display page controls only when multiple pages exist. */}
      {totalPages > 1 && (
        <nav
          className="d-flex justify-content-center align-items-center gap-3 mt-4"
          aria-label="Book pages"
        >
          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            className="btn btn-outline-primary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}

export default Shop;
