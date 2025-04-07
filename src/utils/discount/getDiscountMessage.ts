import { DISCOUNT_TYPE } from '@/constants';
import { Discount } from '@/types/discount.types';

export const getDiscountMessage = (discount: Discount | null) => {
    if (!discount) return null;

    switch (discount.type) {
        case DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT:
            return `Discount: Special price $${discount.specialPrice.toFixed(2)}`;
        case DISCOUNT_TYPE.X_FOR_Y_DISCOUNT:
            return `Discount: Buy ${discount.x}, pay for ${discount.y}`;
        default:
            return null;
    }
};
