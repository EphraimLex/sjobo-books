import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import books from '../data/books.json';

function Checkout() {
  const { cartItems, clearCart } = useCart();

  // Store customer details while the checkout form is open.
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
  });

  // Keep a snapshot of the order after clearing the cart.
  const [completedOrder, setCompletedOrder] = useState(null);

  // Combine cart quantities with the corresponding book details.
  const items = cartItems
    .map((item) => {
      const book = books.find((book) => book.id === item.bookId);

      return book ? { ...book, quantity: item.quantity } : null;
    })
    .filter((item) => item !== null);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Update the field whose name matches a customer property.
  function handleChange(event) {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    // Prevent the browser from reloading the page.
    event.preventDefault();

    // Reject required fields containing only spaces.
    const form = event.currentTarget;

    for (const input of form.querySelectorAll('input[required]')) {
      if (!input.value.trim()) {
        input.setCustomValidity('Please complete this field.');
        input.reportValidity();
        return;
      }
    }

    // Do not create an order from an empty cart.
    if (items.length === 0) {
      return;
    }

    // Preserve the summary before emptying the cart.
    setCompletedOrder({
      items,
      totalPrice,
    });

    clearCart();

    // Clear customer details after the simulated submission.
    setCustomer({
      name: '',
      email: '',
      address: '',
      postalCode: '',
      city: '',
    });
  }

  // Show confirmation before checking whether the cart is empty.
  if (completedOrder) {
    return (
      <section>
        <h1>Demo order complete</h1>

        <div className="alert alert-success" role="status">
          Your simulated order was completed successfully.
          No payment was taken and no books will be shipped.
        </div>

        <h2 className="h4">Order summary</h2>

        <ul className="list-group mb-3">
          {completedOrder.items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex flex-wrap justify-content-between gap-2"
            >
              <span>
                {item.title} × {item.quantity}
              </span>

              <span>
                {(item.price * item.quantity).toFixed(2)} SEK
              </span>
            </li>
          ))}
        </ul>

        <p className="fs-4 fw-bold">
          Total: {completedOrder.totalPrice.toFixed(2)} SEK
        </p>

        <p>Your cart is now empty.</p>

        <Link to="/shop" className="btn btn-success">
          Continue shopping
        </Link>
      </section>
    );
  }

  // Prevent checkout when no available books are in the cart.
  if (items.length === 0) {
    return (
      <section>
        <h1>Checkout</h1>
        <p>Your cart is empty. Add a book before checking out.</p>

        <Link to="/shop" className="btn btn-success">
          Browse books
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Checkout</h1>

      <p className="mb-4">
        This is a demo checkout. Use fictional customer details.
        No real order or payment will be processed.
      </p>

      {/* Stack on smaller screens and use two columns on desktop. */}
      <div className="row g-4">
        <div className="col-lg-6">
          <h2 className="h4 mb-3">Order summary</h2>

          <ul className="list-group mb-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex flex-wrap justify-content-between gap-2"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>

                <span>
                  {(item.price * item.quantity).toFixed(2)} SEK
                </span>
              </li>
            ))}
          </ul>

          <p className="fs-4 fw-bold">
            Total: {totalPrice.toFixed(2)} SEK
          </p>

          <Link to="/cart" className="text-success">
            Back to cart
          </Link>
        </div>

        <div className="col-lg-6">
          <h2 className="h4 mb-3">Customer details</h2>
          <p>All fields are required.</p>

          {/* Use native browser validation for required fields and email. */}
          <form
            onSubmit={handleSubmit}
            onInput={(event) => event.target.setCustomValidity('')}
          >
            <div className="mb-3">
              <label htmlFor="customer-name" className="form-label">
                Full name
              </label>
              <input
                id="customer-name"
                name="name"
                type="text"
                className="form-control"
                autoComplete="name"
                value={customer.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customer-email" className="form-label">
                Email
              </label>
              <input
                id="customer-email"
                name="email"
                type="email"
                className="form-control"
                autoComplete="email"
                value={customer.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="customer-address" className="form-label">
                Street address
              </label>
              <input
                id="customer-address"
                name="address"
                type="text"
                className="form-control"
                autoComplete="street-address"
                value={customer.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-sm-5 mb-3">
                <label
                  htmlFor="customer-postal-code"
                  className="form-label"
                >
                  Postal code
                </label>
                <input
                  id="customer-postal-code"
                  name="postalCode"
                  type="text"
                  className="form-control"
                  autoComplete="postal-code"
                  value={customer.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-sm-7 mb-3">
                <label htmlFor="customer-city" className="form-label">
                  City
                </label>
                <input
                  id="customer-city"
                  name="city"
                  type="text"
                  className="form-control"
                  autoComplete="address-level2"
                  value={customer.city}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success">
              Place demo order
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
