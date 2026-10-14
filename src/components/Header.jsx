import useCart from '../hooks/useCart.js';
import { Link, NavLink } from 'react-router-dom';

function Header() {
  // Get the total number of book copies in the shared cart.
  const { cartCount } = useCart();

  return (
    <header className="bg-white border-bottom">
      <div className="container py-3">
        {/* Clicking the shop name takes the visitor home. */}
        <Link to="/" className="h2 text-decoration-none text-dark">
          Sjöbo Books
        </Link>

        <p className="text-muted mb-3">
          Find your next great read.
        </p>

        {/* NavLink marks the current page as active. */}
        <nav aria-label="Main navigation">
          <ul className="nav nav-pills gap-2">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/shop" className="nav-link">
                Shop
              </NavLink>
            </li>

            <li className="nav-item">
              {/* Update the displayed count when the cart changes. */}
              <NavLink to="/cart" className="nav-link">
                Cart ({cartCount})
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
