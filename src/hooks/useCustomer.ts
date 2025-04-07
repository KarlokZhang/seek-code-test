import { CustomerContext } from '@/context/customer/CustomerContext';
import { CustomerContextType } from '@/context/customer/CustomerContext.types';

import { useContext } from 'react';

export const useCustomer = (): CustomerContextType => {
    const context = useContext(CustomerContext);

    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
};
