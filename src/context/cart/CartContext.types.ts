import { ProductCode } from '@/types/product.types';

export type CartItem = {
    productCode: ProductCode;
    quantity: number;
};

export type CartItems = {
    [key in ProductCode]?: number;
};

export enum CartActionType {
    ADD_ITEM = 'ADD_ITEM',
    REMOVE_ITEM = 'REMOVE_ITEM',
    CLEAR_CART = 'CLEAR_CART',
}

export type CartAction =
    | { type: CartActionType.ADD_ITEM; payload: { productCode: ProductCode; quantity: number } }
    | { type: CartActionType.REMOVE_ITEM; payload: { productCode: ProductCode; quantity: number } }
    | { type: CartActionType.CLEAR_CART };

export type CartContextType = {
    items: CartItems;
    addItem: (item: CartItem) => void;
    removeItem: (item: CartItem) => void;
    clearCart: () => void;
    totalPrice: number;
    savedPrice: number;
    isLoading?: boolean;
    error?: Error;
};

export type CartProviderProps = {
    children: React.ReactNode;
};
