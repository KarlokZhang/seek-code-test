import { PRODUCT_CODE } from '@/constants';

import { fireEvent, render, screen } from '@testing-library/react';

import { ProductAction } from './ProductAction';
import { ProductActionProps } from './ProductAction.types';

const defaultProps: ProductActionProps = {
    product: {
        code: PRODUCT_CODE.CLASSIC,
        name: 'Test Product',
        description: 'Test description.',
        price: 10.99,
    },
    quantity: 0,
    onRemove: jest.fn(),
    onAdd: jest.fn(),
};

const renderComponent = (override: Partial<ProductActionProps> = {}) => {
    const props = { ...defaultProps, ...override };
    return render(<ProductAction {...props} />);
};

describe('ProductAction', () => {
    it('should render the action buttons and quantity', () => {
        renderComponent();
        expect(screen.getByRole('button', { name: 'Remove one Test Product' })).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Add one Test Product' })).toBeInTheDocument();
    });

    it('should call onRemove when the minus button is clicked', () => {
        const onRemove = jest.fn();
        renderComponent({ onRemove, quantity: 1 });
        fireEvent.click(screen.getByRole('button', { name: 'Remove one Test Product' }));
        expect(onRemove).toHaveBeenCalled();
    });

    it('should call onAdd when the plus button is clicked', () => {
        const onAdd = jest.fn();
        renderComponent({ onAdd });
        fireEvent.click(screen.getByRole('button', { name: 'Add one Test Product' }));
        expect(onAdd).toHaveBeenCalled();
    });

    it('should disable the minus button when the quantity is 0', () => {
        renderComponent();
        expect(screen.getByRole('button', { name: 'Remove one Test Product' })).toBeDisabled();
    });

    it('should enable the minus button when the quantity is greater than 0', () => {
        renderComponent({ quantity: 1 });
        expect(screen.getByRole('button', { name: 'Remove one Test Product' })).toBeEnabled();
    });
});
