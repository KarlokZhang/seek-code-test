import { CartContext } from '@/context/cart/CartContext';
import { CartContextType } from '@/context/cart/CartContext.types';

import { useContext } from 'react';

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
