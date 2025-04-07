import { CartAction, CartActionType, CartItems } from './CartContext.types';

export const cartReducer = (state: CartItems, action: CartAction): CartItems => {
    switch (action.type) {
        case CartActionType.ADD_ITEM: {
            const { productCode, quantity } = action.payload;
            const existingProduct = !!state[productCode];
            const currentQuantity = state[productCode] || 0;

            if (existingProduct) {
                return {
                    ...state,
                    [productCode]: currentQuantity + quantity,
                };
            }

            return {
                ...state,
                [productCode]: quantity,
            };
        }

        case CartActionType.REMOVE_ITEM: {
            const { productCode, quantity } = action.payload;
            const existingProduct = !!state[productCode];
            if (!existingProduct) return state;

            const currentQuantity = state[productCode] || 0;

            const newQuantity = Math.max(0, currentQuantity - quantity);

            if (newQuantity === 0) {
                const newState = { ...state };
                delete newState[productCode];
                return newState;
            }

            return {
                ...state,
                [productCode]: newQuantity,
            };
        }

        case CartActionType.CLEAR_CART:
            return {};

        default:
            return state;
    }
};
