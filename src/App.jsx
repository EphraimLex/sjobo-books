import { Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import BookDetails from './pages/BookDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container py-5 flex-grow-1">
        {/* Render the page that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />

          {/* The id identifies the selected book. */}
          <Route path="/books/:id" element={<BookDetails />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Handle addresses that do not match any page. */}
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
