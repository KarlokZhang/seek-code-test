import { Product } from '@/types/product.types';

const PRODUCTS: Product[] = [
    {
        code: 'classic',
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement.',
        price: 269.99,
    },
    {
        code: 'standout',
        name: 'Standout Ad',
        description: 'Allows advertisers to use a company logo and use a longer presentation text.',
        price: 322.99,
    },
    {
        code: 'premium',
        name: 'Premium Ad',
        description:
            'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility.',
        price: 394.99,
    },
];

export const fetchProducts = (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(PRODUCTS), 200);
    });
};
