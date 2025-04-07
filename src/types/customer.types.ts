import { CUSTOMERS } from '@/data/customer';

export type CustomerCode = keyof typeof CUSTOMERS | string;
