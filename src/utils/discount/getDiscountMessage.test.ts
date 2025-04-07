import { DISCOUNT_TYPE } from '@/constants';
import { Discount } from '@/types/discount.types';

import { getDiscountMessage } from './getDiscountMessage';

describe('getDiscountMessage', () => {
    it('should return the correct message for a special price discount', () => {
        const discount = { type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT, specialPrice: 10 };
        const message = getDiscountMessage(discount as Discount);

        expect(message).toBe('Discount: Special price $10.00');
    });

    it('should return the correct message for a x for y discount', () => {
        const discount = { type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT, x: 2, y: 1 };
        const message = getDiscountMessage(discount as Discount);

        expect(message).toBe('Discount: Buy 2, pay for 1');
    });

    it('should return null for an unknown discount type', () => {
        const discount = { type: 'UNKNOWN' as DISCOUNT_TYPE, x: 2, y: 1 };
        const message = getDiscountMessage(discount as Discount);

        expect(message).toBeNull();
    });
});
