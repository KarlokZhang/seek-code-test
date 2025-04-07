import { PRODUCT_CODE } from '@/constants';
import { MockedCartProvider, MockedCustomerProvider } from '@/test/fixtures';
import { Product } from '@/types/product.types';

import { render, screen } from '@testing-library/react';

import { ProductSection } from './ProductSection';

const mockProducts: Product[] = [
    {
        code: PRODUCT_CODE.CLASSIC,
        name: 'Test Product A',
        description: 'Test Description A.',
        price: 10.99,
    },
    {
        code: PRODUCT_CODE.STANDOUT,
        name: 'Test Product B',
        description: 'Test Description B.',
        price: 20.99,
    },
    {
        code: PRODUCT_CODE.PREMIUM,
        name: 'Test Product C',
        description: 'Test Description C.',
        price: 30.99,
    },
];

const renderComponent = () => {
    return render(
        <MockedCartProvider>
            <MockedCustomerProvider>
                <ProductSection products={mockProducts} heading="Products" />
            </MockedCustomerProvider>
        </MockedCartProvider>,
    );
};

describe('ProductSection', () => {
    it('should render the heading of the product section', () => {
        renderComponent();
        expect(screen.getByRole('heading', { name: 'Products' })).toBeInTheDocument();
    });

    it('should render all products in the section', () => {
        renderComponent();
        expect(screen.getByRole('heading', { name: 'Test Product A' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Test Product B' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Test Product C' })).toBeInTheDocument();
    });
});
