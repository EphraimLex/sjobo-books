// Common words that do not help narrow a title or author search.
const stopWords = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'in',
  'on', 'at', 'to', 'for', 'from', 'by', 'with',
]);

// Make searches independent of capital letters and accents.
function normalizeText(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function searchBooks(books, query) {
  const trimmedQuery = query.trim();

  // An empty search displays the full collection.
  if (!trimmedQuery) {
    return books;
  }

  // ISBN searches ignore spaces and hyphens.
  const isbnQuery = trimmedQuery.replace(/[\s-]/g, '');

  // Recognize a complete ISBN-10 or ISBN-13.
  const isIsbn = /^(?:\d{9}[\dX]|\d{13})$/i.test(isbnQuery);

  if (isIsbn) {
    return books.filter((book) => {
      const bookIsbn = String(book.isbn ?? '')
        .replace(/[\s-]/g, '');

      return bookIsbn.toUpperCase() === isbnQuery.toUpperCase();
    });
  }

  // Split the search into words and remove common stop words.
  const searchWords = (
    normalizeText(trimmedQuery).match(/[\p{L}\p{N}]+/gu) ?? []
  ).filter((word) => !stopWords.has(word));

  // A search containing only stop words returns no matches.
  if (searchWords.length === 0) {
    return [];
  }

  return books.filter((book) => {
    const searchableText = normalizeText(
      `${book.title} ${book.author}`
    );

    // Every meaningful word must appear in the title or author.
    return searchWords.every((word) =>
      searchableText.includes(word)
    );
  });
}