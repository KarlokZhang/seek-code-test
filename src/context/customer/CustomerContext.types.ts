import { CustomerCode } from '@/types/customer.types';
import { PricingRule } from '@/types/pricingRule.types';

export type CustomerContextType = {
    customerCode: CustomerCode;
    setCustomerCode: (code: CustomerCode) => void;
    pricingRule: PricingRule[];
    loading: boolean;
};
