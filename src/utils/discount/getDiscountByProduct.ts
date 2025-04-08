import { Discount } from '@/types/discount.types';
import { ProductCode } from '@/types/product.types';

export const getDiscountByProduct = (productCode: ProductCode, pricingRule: Discount[]): Discount | null => {
    const discount = pricingRule.find((rule) => rule.productCode === productCode);

    if (!discount) return null;

    return discount;
};
