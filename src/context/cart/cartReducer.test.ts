import { PRODUCT_CODE } from '@/constants';

import { CartAction, CartActionType, CartItems } from './CartContext.types';
import { cartReducer } from './cartReducer';

describe('cartReducer', () => {
    const initialState: CartItems = {};

    it('should return the initial state', () => {
        const action: CartAction = { type: CartActionType.CLEAR_CART };
        const newState = cartReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });

    it('should add an item to the cart', () => {
        const addItemAction: CartAction = {
            type: CartActionType.ADD_ITEM,
            payload: { productCode: PRODUCT_CODE.CLASSIC, quantity: 1 },
        };
        const newState = cartReducer(initialState, addItemAction);

        expect(newState).toEqual({ [PRODUCT_CODE.CLASSIC]: 1 });
    });

    it('should remove an item from the cart when there is only one item', () => {
        const initialState: CartItems = { [PRODUCT_CODE.CLASSIC]: 1 };
        const removeItemAction: CartAction = {
            type: CartActionType.REMOVE_ITEM,
            payload: { productCode: PRODUCT_CODE.CLASSIC, quantity: 1 },
        };
        const newState = cartReducer(initialState, removeItemAction);

        expect(newState).toEqual({});
    });

    it('should remove an item from the cart when there is more than one item', () => {
        const initialState: CartItems = { [PRODUCT_CODE.CLASSIC]: 100 };
        const removeItemAction: CartAction = {
            type: CartActionType.REMOVE_ITEM,
            payload: { productCode: PRODUCT_CODE.CLASSIC, quantity: 1 },
        };

        const newState = cartReducer(initialState, removeItemAction);
        expect(newState).toEqual({ [PRODUCT_CODE.CLASSIC]: 99 });
    });

    it('should clear the cart', () => {
        const initialState: CartItems = { [PRODUCT_CODE.CLASSIC]: 100 };
        const clearCartAction: CartAction = { type: CartActionType.CLEAR_CART };
        const newState = cartReducer(initialState, clearCartAction);

        expect(newState).toEqual({});
    });

    it('should add an item to the cart when there is already an item with the same product code', () => {
        const initialState: CartItems = { [PRODUCT_CODE.CLASSIC]: 1 };
        const addItemAction: CartAction = {
            type: CartActionType.ADD_ITEM,
            payload: { productCode: PRODUCT_CODE.CLASSIC, quantity: 1 },
        };
        const newState = cartReducer(initialState, addItemAction);

        expect(newState).toEqual({ [PRODUCT_CODE.CLASSIC]: 2 });
    });
});
