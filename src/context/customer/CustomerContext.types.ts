import { CustomerCode } from '@/types/customer.types';
import { Discount } from '@/types/discount.types';

export type CustomerContextType = {
    customerCode: CustomerCode;
    setCustomerCode: (code: CustomerCode) => void;
    pricingRule: Discount[];
    loading: boolean;
};
