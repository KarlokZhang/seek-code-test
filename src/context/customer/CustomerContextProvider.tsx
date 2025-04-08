import { fetchCustomerPricingRule } from '@/api/fetchCustomerPricingRule';
import { useAsync } from '@/hooks/useAsync';
import { CustomerCode } from '@/types/customer.types';
import { Discount } from '@/types/discount.types';

import React, { useCallback, useEffect, useState } from 'react';

import { CustomerContext } from './CustomerContext';

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [customerCode, setCustomerCode] = useState<CustomerCode>('default' as CustomerCode);
    const [pricingRule, setPricingRule] = useState<Discount[]>([]);

    const fetchPricingRule = useCallback(() => {
        return fetchCustomerPricingRule(customerCode);
    }, [customerCode]);

    const { data: pricingRuleData, loading } = useAsync(fetchPricingRule);

    useEffect(() => {
        if (pricingRuleData) {
            setPricingRule(pricingRuleData);
        }
    }, [pricingRuleData]);

    return (
        <CustomerContext.Provider value={{ customerCode, setCustomerCode, pricingRule, loading }}>
            {children}
        </CustomerContext.Provider>
    );
};
