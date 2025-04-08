import { DISCOUNT_TYPE } from '@/constants/discount';
import { CustomerCode } from '@/types/customer.types';
import { Discount } from '@/types/discount.types';

import { fetchCustomerPricingRule } from './fetchCustomerPricingRule';

jest.mock('./fetchCustomerPricingRule');
const mockFetchCustomerPricingRule = fetchCustomerPricingRule as jest.MockedFunction<typeof fetchCustomerPricingRule>;

describe('fetchCustomerPricingRule', () => {
    beforeEach(() => {
        mockFetchCustomerPricingRule.mockReset();
    });

    it('should fetch the correct pricing rules for customer', async () => {
        const customerCode: CustomerCode = 'axilCoffeeRoasters';
        const expectedRules: Discount[] = [
            {
                productCode: 'standout',
                type: DISCOUNT_TYPE.SPECIAL_PRICE_DISCOUNT,
                specialPrice: 299.99,
            },
        ];

        mockFetchCustomerPricingRule.mockResolvedValue(expectedRules);

        const rules = await fetchCustomerPricingRule(customerCode);
        expect(rules).toEqual(expectedRules);
    });

    it('should fetch all pricing rules for customer when it has multiple rules', async () => {
        const customerCode: CustomerCode = 'myer';
        const expectedRules: Discount[] = [
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
        ];

        mockFetchCustomerPricingRule.mockResolvedValue(expectedRules);

        const rules = await fetchCustomerPricingRule(customerCode);
        expect(rules).toEqual(expectedRules);
    });

    it('should return empty pricing rules for default customer', async () => {
        const customerCode: CustomerCode = 'default';
        const expectedRules: Discount[] = [];

        mockFetchCustomerPricingRule.mockResolvedValue(expectedRules);

        const rules = await fetchCustomerPricingRule(customerCode);
        expect(rules).toEqual(expectedRules);
    });

    it('should reject with error for invalid customer code', async () => {
        const invalidCustomerCode = 'invalidCustomer' as CustomerCode;

        mockFetchCustomerPricingRule.mockRejectedValue(new Error(`Customer code ${invalidCustomerCode} not found`));

        await expect(fetchCustomerPricingRule(invalidCustomerCode)).rejects.toThrow(
            `Customer code ${invalidCustomerCode} not found`,
        );
    });
});
