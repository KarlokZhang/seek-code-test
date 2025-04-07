import { CustomerContext } from '@/context/customer/CustomerContext';
import { CustomerContextType } from '@/context/customer/CustomerContext.types';

import { ReactNode } from 'react';

export const MockedCustomerProvider = (props: Partial<CustomerContextType> & { children: ReactNode }) => {
    return (
        <CustomerContext.Provider
            value={{
                customerCode: 'default',
                setCustomerCode: jest.fn(),
                pricingRule: [],
                loading: false,
                ...props,
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    );
};
