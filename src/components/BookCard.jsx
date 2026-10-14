import { Link } from 'react-router-dom';

// Receive one book and display its information.
function BookCard({ book }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <p className="text-muted small">{book.genre}</p>
        <h2 className="h5">{book.title}</h2>
        <p>By {book.author}</p>
        <p className="fw-bold">{book.price} SEK</p>

        {/* Link to the details page for this book. */}
        <Link
          to={`/books/${book.id}`}
          className="btn btn-outline-success mt-auto"
        >
          View details
        </Link>
      </div>
    </article>
  );
}

export default BookCard;
