import { DISCOUNT_TYPE, PRODUCT_CODE } from '@/constants';
import { CartItems } from '@/context';
import { Discount } from '@/types/discount.types';
import { Product } from '@/types/product.types';

import { calculatePrice, getPriceSummaryForProduct, getProductMap } from './calculatePrice';

const mockProducts: Product[] = [
    {
        code: PRODUCT_CODE.CLASSIC,
        name: 'Classic',
        description: 'Classic product',
        price: 100,
    },
    {
        code: PRODUCT_CODE.STANDOUT,
        name: 'Standout',
        description: 'Standout product',
        price: 200,
    },
    {
        code: PRODUCT_CODE.PREMIUM,
        name: 'Premium',
        description: 'Premium product',
        price: 300,
    },
];

const mockCartItems: CartItems = {
    [PRODUCT_CODE.CLASSIC]: 1,
    [PRODUCT_CODE.STANDOUT]: 1,
    [PRODUCT_CODE.PREMIUM]: 2,
};

const [mockClassicProduct, mockStandoutProduct, mockPremiumProduct] = mockProducts;

const mockSpecialPriceDiscount: Discount = {
    type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT,
    productCode: PRODUCT_CODE.CLASSIC,
    specialPrice: 50,
};

const mockXForYDiscount: Discount = {
    type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT,
    productCode: PRODUCT_CODE.PREMIUM,
    x: 3,
    y: 2,
};

describe('getProductMap', () => {
    it('should return a map of products', () => {
        const productMap = getProductMap(mockProducts);

        expect(productMap.size).toBe(mockProducts.length);
        expect(productMap.get(PRODUCT_CODE.CLASSIC)).toBe(mockClassicProduct);
        expect(productMap.get(PRODUCT_CODE.STANDOUT)).toBe(mockStandoutProduct);
        expect(productMap.get(PRODUCT_CODE.PREMIUM)).toBe(mockPremiumProduct);
    });
});

describe('getPriceSummaryForProduct', () => {
    it('should return the correct price summary for a product with no discount', () => {
        const priceSummary = getPriceSummaryForProduct(4, mockClassicProduct);

        expect(priceSummary.subTotalPrice).toBe(400);
        expect(priceSummary.subSavedPrice).toBe(0);
    });

    it('should return the correct price summary for a product with a special price discount', () => {
        const priceSummary = getPriceSummaryForProduct(4, mockClassicProduct, mockSpecialPriceDiscount);

        expect(priceSummary.subTotalPrice).toBe(200);
        expect(priceSummary.subSavedPrice).toBe(200);
    });

    it('should return the correct price summary for a product with an X for Y discount', () => {
        const priceSummary = getPriceSummaryForProduct(4, mockPremiumProduct, mockXForYDiscount);

        expect(priceSummary.subTotalPrice).toBe(900);
        expect(priceSummary.subSavedPrice).toBe(300);
    });
});

describe('calculatePrice', () => {
    it('should return the correct price summary for a cart with no discounts', () => {
        const priceSummary = calculatePrice(mockCartItems, mockProducts, []);

        expect(priceSummary.totalPrice).toBe(900);
        expect(priceSummary.savedPrice).toBe(0);
    });

    it('should return the correct price summary for a cart with discounts', () => {
        const priceSummary = calculatePrice(mockCartItems, mockProducts, [mockSpecialPriceDiscount, mockXForYDiscount]);

        expect(priceSummary.totalPrice).toBe(850);
        expect(priceSummary.savedPrice).toBe(50);
    });
});
