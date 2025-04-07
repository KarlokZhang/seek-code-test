import { CartContext } from '@/context/cart/CartContext';
import { CartContextType } from '@/context/cart/CartContext.types';

import { ReactNode } from 'react';

export const MockedCartProvider = (props: Partial<CartContextType> & { children: ReactNode }) => {
    return (
        <CartContext.Provider
            value={{
                items: {},
                addItem: jest.fn(),
                removeItem: jest.fn(),
                clearCart: jest.fn(),
                totalPrice: 0,
                savedPrice: 0,
                ...props,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
};
