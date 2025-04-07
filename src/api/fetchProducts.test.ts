import { Product } from '@/types/product.types';

import { fetchProducts } from './fetchProducts';

jest.mock('./fetchProducts');
const mockFetchProducts = fetchProducts as jest.MockedFunction<typeof fetchProducts>;

describe('fetchProducts', () => {
    beforeEach(() => {
        mockFetchProducts.mockReset();
    });

    it('should fetch all available products', async () => {
        const expectedProducts: Product[] = [
            {
                code: 'classic',
                name: 'Test Product 1',
                description: 'Test Description 1',
                price: 10.99,
            },
            {
                code: 'standout',
                name: 'Test Product 2',
                description: 'Test Description 2',
                price: 20.99,
            },
            {
                code: 'premium',
                name: 'Test Product 3',
                description: 'Test Description 3',
                price: 30.99,
            },
        ];

        mockFetchProducts.mockResolvedValue(expectedProducts);

        const products = await fetchProducts();
        expect(products).toEqual(expectedProducts);
    });

    it('should return empty array when no products are available', async () => {
        mockFetchProducts.mockResolvedValue([]);

        const products = await fetchProducts();
        expect(products).toEqual([]);
    });
});
