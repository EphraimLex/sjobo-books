import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import books from '../data/books.json';

function Cart() {
  // Get the cart data and actions for adjusting quantities.
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    clearCart,
  } = useCart();

  // Combine each selected quantity with its book information.
  const items = cartItems
    .map((item) => {
      const book = books.find((book) => book.id === item.bookId);

      if (!book) {
        return null;
      }

      return {
        ...book,
        quantity: item.quantity,
      };
    })
    .filter((item) => item !== null);

  // Calculate the total cost of all selected copies.
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Show this message when the last book has been removed.
  if (items.length === 0) {
    return (
      <section>
        <h1>Your cart</h1>
        <p>Your cart is currently empty.</p>

        <Link to="/shop" className="btn btn-success">
          Browse books
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-4">Your cart</h1>
      <p>Use + or − to adjust quantities. Reducing to zero removes the book.</p>

      <div className="table-responsive">
        <table className="table align-middle">
          <caption>Books selected for your order</caption>

          <thead>
            <tr>
              <th scope="col">Book</th>
              <th scope="col">Unit price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <Link
                    to={`/books/${item.id}`}
                    className="text-success"
                  >
                    {item.title}
                  </Link>
                </th>

                <td>{item.price.toFixed(2)} SEK</td>

                <td>
                  <div className="d-flex align-items-center gap-2">
                    {/* Remove one copy of this book. */}
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => decreaseQuantity(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      −
                    </button>

                    <span className="fw-bold" aria-live="polite">
                      {item.quantity}
                    </span>

                    {/* Add one copy of this book. */}
                    <button
                      type="button"
                      className="btn btn-outline-success"
                      onClick={() => addToCart(item.id)}
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td>
                  {(item.price * item.quantity).toFixed(2)} SEK
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="fs-4 fw-bold">
        Total: {totalPrice.toFixed(2)} SEK
      </p>

      <div className="d-flex flex-wrap gap-2">
        <Link to="/shop" className="btn btn-outline-success">
          Continue shopping
        </Link>

        {/* Remove all items at once. */}
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={clearCart}
        >
          Empty cart
        </button>

        <Link to="/checkout" className="btn btn-success">
          Proceed to checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;