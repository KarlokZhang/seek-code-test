import { CustomerCode } from './customer.types';
import { Discount } from './discount.types';

export type PricingRulesConfig = Record<CustomerCode, Discount[]>;
