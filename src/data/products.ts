import { PRODUCT_CODE } from '@/constants';
import { Product } from '@/types/product.types';

export const PRODUCTS: Product[] = [
    {
        code: PRODUCT_CODE.CLASSIC,
        name: 'Classic Ad',
        description: 'Offers the most basic level of advertisement.',
        price: 269.99,
    },
    {
        code: PRODUCT_CODE.STANDOUT,
        name: 'Standout Ad',
        description: 'Allows advertisers to use a company logo and use a longer presentation text.',
        price: 322.99,
    },
    {
        code: PRODUCT_CODE.PREMIUM,
        name: 'Premium Ad',
        description:
            'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility.',
        price: 394.99,
    },
];
