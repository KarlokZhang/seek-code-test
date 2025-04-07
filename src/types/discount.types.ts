import { DISCOUNT_TYPE } from '@/constants/discount';

import { ProductCode } from './product.types';

export type X_FOR_Y_DISCOUNT = {
    productCode: ProductCode;
    type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT;
    x: number;
    y: number;
};

export type SPECIAL_PRICE_DISCOUNT = {
    productCode: ProductCode;
    type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT;
    specialPrice: number;
};

export type Discount = X_FOR_Y_DISCOUNT | SPECIAL_PRICE_DISCOUNT;
