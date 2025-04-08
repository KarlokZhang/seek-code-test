import { DISCOUNT_TYPE } from '@/constants/discount';
import { CustomerCode } from '@/types/customer.types';
import { Discount } from '@/types/discount.types';
import { PricingRulesConfig } from '@/types/pricingRule.types';
import { logger } from '@/utils/logger/logger';

const PRICING_RULES_CONFIG: PricingRulesConfig = {
    axilCoffeeRoasters: [{ productCode: 'standout', type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT, specialPrice: 299.99 }],
    secondBite: [
        {
            productCode: 'classic',
            type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT,
            x: 3,
            y: 2,
        },
    ],
    myer: [
        {
            productCode: 'standout',
            type: DISCOUNT_TYPE.X_FOR_Y_DISCOUNT,
            x: 5,
            y: 4,
        },
        {
            productCode: 'premium',
            type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT,
            specialPrice: 389.99,
        },
    ],
    default: [],
};

export const fetchCustomerPricingRule = (customerCode: CustomerCode): Promise<Discount[]> => {
    return new Promise((resolve, reject) => {
        if (!Object.keys(PRICING_RULES_CONFIG).includes(customerCode)) {
            reject(new Error(`Customer code ${customerCode} not found`));
            logger.error(`Customer code ${customerCode} not found`);
            return;
        }

        setTimeout(() => resolve(PRICING_RULES_CONFIG[customerCode]), 200);
    });
};
