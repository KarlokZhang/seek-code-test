import { PRODUCT_CODE } from '@/constants';
import { MockedCartProvider, MockedCustomerProvider } from '@/test/fixtures';
import { Product } from '@/types/product.types';

import { render, screen } from '@testing-library/react';

import { ProductCard } from './ProductCard';
import { ProductCardProps } from './ProductCard.types';

const mockProduct: Product = {
    code: PRODUCT_CODE.CLASSIC,
    name: 'Test Product',
    description: 'Product Description',
    price: 100,
};

const defaultProps: ProductCardProps = {
    product: mockProduct,
    discountMessage: null,
};

describe('ProductCard', () => {
    const renderComponent = (overrides: Partial<ProductCardProps> = {}) => {
        const props = {
            ...defaultProps,
            ...overrides,
        };

        return render(
            <MockedCustomerProvider>
                <MockedCartProvider
                    items={{}}
                    addItem={jest.fn()}
                    removeItem={jest.fn()}
                    clearCart={jest.fn()}
                    totalPrice={0}
                    savedPrice={0}
                >
                    <ProductCard {...props} />
                </MockedCartProvider>
            </MockedCustomerProvider>,
        );
    };

    it('should render the product name', () => {
        renderComponent({ ...defaultProps, product: { ...mockProduct, name: 'Product Name' } });
        expect(screen.getByText('Product Name')).toBeInTheDocument();
    });

    it('should render the product description', () => {
        renderComponent({ ...defaultProps, product: { ...mockProduct, description: 'Product Description' } });
        expect(screen.getByText('Product Description')).toBeInTheDocument();
    });

    it('should render the product price', () => {
        renderComponent({ ...defaultProps, product: { ...mockProduct, price: 100 } });
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('should render the product action buttons', () => {
        renderComponent({ ...defaultProps, product: { ...mockProduct, name: 'Test product' } });
        expect(screen.getByRole('button', { name: 'Add one Test product' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Remove one Test product' })).toBeInTheDocument();
    });

    it('should not render the discount message if it is not provided', () => {
        renderComponent({ ...defaultProps });
        expect(screen.queryByText('Discount message')).not.toBeInTheDocument();
    });

    it('should render the discount message if it is provided', () => {
        renderComponent({ ...defaultProps, discountMessage: 'Discount message' });
        expect(screen.getByText('Discount message')).toBeInTheDocument();
    });
});
