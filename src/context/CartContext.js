import { createContext } from 'react';

// Create a shared connection between the cart provider and components.
const CartContext = createContext(null);

export default CartContext;
