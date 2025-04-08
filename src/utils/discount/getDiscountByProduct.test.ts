import { DISCOUNT_TYPE } from '@/constants';
import { PRODUCT_CODE } from '@/constants';
import { Discount, SPECIAL_PRICE_DISCOUNT, X_FOR_Y_DISCOUNT } from '@/types/discount.types';

import { getDiscountByProduct } from './getDiscountByProduct';

const mockPricingRules: Discount[] = [];

describe('getDiscountByProduct', () => {
    it('should return null if there is no discount for the product', () => {
        const discount = getDiscountByProduct(PRODUCT_CODE.STANDOUT, mockPricingRules);

        expect(discount).toEqual(null);
    });

    it('should return null if the product is not in the pricing rules', () => {
        const discount = getDiscountByProduct(PRODUCT_CODE.STANDOUT, mockPricingRules);

        expect(discount).toEqual(null);
    });

    it('should return the correct discount for a product', () => {
        const mockDiscountForClassicProduct: Discount[] = [
            {
                productCode: PRODUCT_CODE.CLASSIC,
                type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT,
                x: 2,
                y: 1,
            } as X_FOR_Y_DISCOUNT,
            {
                productCode: PRODUCT_CODE.CLASSIC,
                type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT,
                specialPrice: 10,
            } as SPECIAL_PRICE_DISCOUNT,
        ];

        const discount = getDiscountByProduct(PRODUCT_CODE.CLASSIC, mockDiscountForClassicProduct);

        expect(discount).toEqual({
            productCode: PRODUCT_CODE.CLASSIC,
            type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT,
            x: 2,
            y: 1,
        });
    });
});
