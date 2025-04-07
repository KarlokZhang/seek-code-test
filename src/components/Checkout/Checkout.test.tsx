import { fetchProducts } from '@/api/fetchProducts';
import { useAsync } from '@/hooks/useAsync';
import { MockedCartProvider, MockedCustomerProvider } from '@/test/fixtures';

import { render, screen } from '@testing-library/react';

import { Checkout } from './Checkout';
import { CheckoutProps } from './Checkout.types';

jest.mock('@/hooks/useAsync');
jest.mock('@/api/products');

const mockUseAsync = useAsync as jest.MockedFunction<typeof useAsync>;
const mockFetchProducts = fetchProducts as jest.MockedFunction<typeof fetchProducts>;

const defaultProps: CheckoutProps = {
    heading: '',
};

const mockProducts = [
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
];

const renderComponent = (override?: Partial<CheckoutProps>) => {
    const props = {
        ...defaultProps,
        ...override,
    };

    return render(
        <MockedCustomerProvider>
            <MockedCartProvider totalPrice={100} savedPrice={10}>
                <Checkout {...props} />
            </MockedCartProvider>
        </MockedCustomerProvider>,
    );
};

describe('Checkout', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the heading of the checkout component', () => {
        mockUseAsync.mockReturnValue({
            data: mockProducts,
            loading: false,
            error: null,
        });

        renderComponent({ heading: 'Testing heading' });
        expect(screen.getByRole('heading', { level: 1, name: 'Testing heading' })).toBeInTheDocument();
    });

    it('should render the customer selector', () => {
        mockUseAsync.mockReturnValue({
            data: mockProducts,
            loading: false,
            error: null,
        });

        renderComponent();
        expect(screen.getByRole('combobox', { name: 'Select Customer' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Default' })).toBeInTheDocument();
    });

    it('should show loading state when products are being fetched', () => {
        mockUseAsync.mockReturnValue({
            data: null,
            loading: true,
            error: null,
        });

        renderComponent();
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render the product section when products are loaded', () => {
        mockUseAsync.mockReturnValue({
            data: mockProducts,
            loading: false,
            error: null,
        });

        renderComponent();
        expect(screen.getByRole('heading', { level: 2, name: 'Products' })).toBeInTheDocument();

        expect(screen.getByText('Classic Ad')).toBeInTheDocument();
        expect(screen.getByText('Standout Ad')).toBeInTheDocument();
    });

    it('should render the price summary', () => {
        mockUseAsync.mockReturnValue({
            data: mockProducts,
            loading: false,
            error: null,
        });

        renderComponent();

        expect(screen.getByText(/Original Price:/)).toBeInTheDocument();
        expect(screen.getByText('$110.00')).toBeInTheDocument();
    });

    it('should call fetchProducts when component mounts', () => {
        mockFetchProducts.mockReset();

        mockUseAsync.mockImplementation((fn) => {
            fn();
            return {
                data: mockProducts,
                loading: false,
                error: null,
            };
        });

        renderComponent();

        expect(fetchProducts).toHaveBeenCalled();
    });
});
