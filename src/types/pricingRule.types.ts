import { CustomerCode } from './customer.types';
import { SPECIAL_PRICE_DISCOUNT, X_FOR_Y_DISCOUNT } from './discount.types';

export type PricingRulesConfig = Record<CustomerCode, PricingRule[]>;

export type PricingRule = X_FOR_Y_DISCOUNT | SPECIAL_PRICE_DISCOUNT;
