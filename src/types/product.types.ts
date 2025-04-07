export type ProductCode = 'classic' | 'standout' | 'premium';

export type Product = {
    code: ProductCode;
    name: string;
    description: string;
    price: number;
};
