export enum DISCOUNT_TYPE {
    X_FOR_Y_DISCOUNT = 'X_FOR_Y_DISCOUNT',
    SPECIAL_PRICE_DISCOUNT = 'SPECIAL_PRICE_DISCOUNT',
}

export type DiscountType = keyof typeof DISCOUNT_TYPE;
