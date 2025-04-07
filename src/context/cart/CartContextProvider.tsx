import { fetchProducts } from '@/api/fetchProducts';
import { useAsync } from '@/hooks/useAsync';
import { useCustomer } from '@/hooks/useCustomer';
import { Product } from '@/types/product.types';

import { useCallback, useEffect, useState } from 'react';
import { useReducer } from 'react';

import { CartContext } from './CartContext';
import { CartItem } from './CartContext.types';
import { CartActionType } from './CartContext.types';
import { CartProviderProps } from './CartContext.types';
import { cartReducer } from './cartReducer';
import { calculatePrice } from './utils/calculatePrice';

export const CartProvider = ({ children }: CartProviderProps) => {
    const { pricingRule } = useCustomer();
    const [items, dispatch] = useReducer(cartReducer, {});
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);

    const { data: productsData, loading: loadingProducts, error: productsError } = useAsync(fetchProducts);

    useEffect(() => {
        if (productsData) {
            setProducts(productsData);
        }
    }, [productsData]);

    useEffect(() => {
        if (productsError) {
            console.error('Failed to load products:', productsError);
            setError(productsError);
        }
    }, [productsError]);

    const { totalPrice, savedPrice } = calculatePrice(items, products, pricingRule);

    const addItem = useCallback((item: CartItem) => dispatch({ type: CartActionType.ADD_ITEM, payload: item }), []);

    const removeItem = useCallback(
        (item: CartItem) => dispatch({ type: CartActionType.REMOVE_ITEM, payload: item }),
        [],
    );

    const clearCart = useCallback(() => dispatch({ type: CartActionType.CLEAR_CART }), []);

    const isLoading = loadingProducts;

    const contextValue = {
        items,
        addItem,
        removeItem,
        clearCart,
        totalPrice,
        savedPrice,
        isLoading,
        error,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
