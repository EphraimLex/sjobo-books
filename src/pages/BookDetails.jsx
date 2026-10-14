import useCart from "../hooks/useCart.js";
import { Link, useParams } from "react-router-dom";
import books from "../data/books.json";

function BookDetails() {
  // Get the function for adding a book to the shared cart.
  const { addToCart } = useCart();

  // Read the book ID from the URL, for example /books/2.
  const { id } = useParams();

  // URL parameters are strings, but our JSON IDs are numbers.
  const book = books.find((book) => book.id === Number(id));

  // Handle an ID that does not exist in our catalogue.
  if (!book) {
    return (
      <section>
        <h1>Book not found</h1>
        <p>We could not find the book you requested.</p>
        <Link to="/shop" className="btn btn-outline-success">
          Back to shop
        </Link>
      </section>
    );
  }

  return (
    <section>
      <Link to="/shop" className="text-success">
        Back to shop
      </Link>

      <article className="card shadow-sm mt-4">
        <div className="card-body p-4">
          <p className="text-muted">{book.genre}</p>
          <h1>{book.title}</h1>
          <p className="lead">By {book.author}</p>
          <p>{book.description}</p>
          <p className="fw-bold fs-4">{book.price} SEK</p>

          {/* Add one copy of this book when the button is clicked. */}
          <button
            type="button"
            className="btn btn-success"
            onClick={() => addToCart(book.id)}
          >
            Add to cart
          </button>
        </div>
      </article>
    </section>
  );
}

export default BookDetails;