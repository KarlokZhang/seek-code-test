import { PRODUCT_CODE } from '@/constants';

export type ProductCode = keyof typeof PRODUCT_CODE;

export type Product = {
    code: ProductCode;
    name: string;
    description: string;
    price: number;
};
