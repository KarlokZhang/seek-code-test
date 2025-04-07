import { createContext } from 'react';

import { CartContextType } from './CartContext.types';

export const CartContext = createContext<CartContextType>({
    items: {},
    addItem: () => {},
    removeItem: () => {},
    clearCart: () => {},
    totalPrice: 0,
    savedPrice: 0,
    isLoading: false,
    error: undefined,
});
