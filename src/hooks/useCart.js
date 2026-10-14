import { useContext } from 'react';
import CartContext from '../context/CartContext.js';

// Give components a simple way to access the shared cart.
function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error('useCart must be used inside CartProvider.');
  }

  return context;
}

export default useCart;
