import { DISCOUNT_TYPE } from '@/constants';
import { Discount } from '@/types/discount.types';
import { Product, ProductCode } from '@/types/product.types';
import { logger } from '@/utils/logger/logger';

import { CartItems } from '../CartContext.types';

export type PriceSummary = {
    totalPrice: number;
    savedPrice: number;
};

export const calculatePrice = (items: CartItems, products: Product[], discounts: Discount[]): PriceSummary => {
    const cartIsEmpty = Object.keys(items).length === 0;

    if (cartIsEmpty) {
        return {
            totalPrice: 0,
            savedPrice: 0,
        };
    }

    const productMap = getProductMap(products);

    let totalPrice = 0;
    let savedPrice = 0;

    for (const [productCode, quantity] of Object.entries(items)) {
        if (quantity === 0) continue;

        const product = productMap.get(productCode as ProductCode);
        if (!product) continue;

        const discount = discounts.find((discount) => discount.productCode === productCode);

        const { subTotalPrice, subSavedPrice } = getPriceSummaryForProduct(quantity, product, discount);

        totalPrice += subTotalPrice;
        savedPrice += subSavedPrice;
    }

    return {
        totalPrice,
        savedPrice,
    };
};

export const getProductMap = (products: Product[]): Map<ProductCode, Product> => {
    return new Map(products.map((product) => [product.code, product]));
};

export const getPriceSummaryForProduct = (
    quantity: number,
    product: Product,
    discount?: Discount,
): { subTotalPrice: number; subSavedPrice: number } => {
    const fullPrice = quantity * product.price;

    const priceWithoutDiscount = { subTotalPrice: fullPrice, subSavedPrice: 0 };

    if (!discount) {
        return priceWithoutDiscount;
    }

    switch (discount.type) {
        case DISCOUNT_TYPE.X_FOR_Y_DISCOUNT: {
            if (discount.y > discount.x) {
                logger.error(`Discount ${discount.type} is invalid, X should be greater than Y`);
                return priceWithoutDiscount;
            }

            if (quantity < discount.x) {
                return priceWithoutDiscount;
            }

            const sets = Math.floor(quantity / discount.x);
            const remaining = quantity % discount.x;

            const payableUnits = sets * discount.y + remaining;
            const discountedPrice = payableUnits * product.price;

            return {
                subTotalPrice: discountedPrice,
                subSavedPrice: fullPrice - discountedPrice,
            };
        }
        case DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT:
            return {
                subTotalPrice: quantity * discount.specialPrice,
                subSavedPrice: fullPrice - quantity * discount.specialPrice,
            };
        default:
            logger.warn('Unknown discount type encountered');
            return priceWithoutDiscount;
    }
};
