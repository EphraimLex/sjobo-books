import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import CartProvider from './context/CartProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Hash-based navigation supports page refreshes on GitHub Pages. */}
    <HashRouter>
      {/* Make the cart available throughout the application. */}
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </StrictMode>
);
