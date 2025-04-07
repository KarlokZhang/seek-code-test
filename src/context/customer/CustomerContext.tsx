import { createContext } from 'react';

import { CustomerContextType } from './CustomerContext.types';

export const CustomerContext = createContext<CustomerContextType>({
    customerCode: 'default',
    setCustomerCode: () => {},
    pricingRule: [],
    loading: false,
});
