import { useEffect, useState } from 'react';
import CartContext from './CartContext.js';

// Use a shop-specific key for the browser's saved cart.
const CART_STORAGE_KEY = 'sjobo-books-cart';

// Read the saved cart when the provider first loads.
function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    // Start with an empty cart if nothing has been saved.
    if (savedCart === null) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    // Only accept an array containing valid cart entries.
    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart.filter(
      (item) =>
        item !== null &&
        typeof item === 'object' &&
        Number.isSafeInteger(item.bookId) &&
        item.bookId > 0 &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch {
    // Keep the app usable if storage is unavailable or data is invalid.
    return [];
  }
}

function CartProvider({ children }) {
  // Load saved items instead of always starting with an empty cart.
  const [cartItems, setCartItems] = useState(loadCart);

  // Save the cart after its contents change.
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch {
      // The cart still works if the browser cannot save it.
      console.warn('The cart could not be saved in this browser.');
    }
  }, [cartItems]);

  // Add one copy of a book to the cart.
  function addToCart(bookId) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.bookId === bookId
      );

      // Increase the quantity if the book is already selected.
      if (existingItem) {
        return currentItems.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Add a new book with an initial quantity of one.
      return [...currentItems, { bookId, quantity: 1 }];
    });
  }

  // Remove one copy, and remove the entry at zero.
  function decreaseQuantity(bookId) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // Remove all copies of a specific book.
  function removeFromCart(bookId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.bookId !== bookId)
    );
  }

  // Remove every item from the cart.
  function clearCart() {
    setCartItems([]);
  }

  // Count the total number of book copies.
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Share the cart data and actions with child components.
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;