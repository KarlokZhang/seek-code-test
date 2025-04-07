import { render, screen } from '@testing-library/react';

import { PriceSummary } from './PriceSummary';

describe('PriceSummary', () => {
    it('should render the price summary heading', () => {
        render(<PriceSummary totalPrice={100} savedPrice={10} />);

        expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
    });

    it('should render the total price', () => {
        render(<PriceSummary totalPrice={100} savedPrice={0} />);

        expect(screen.getByText(/Total Price:/)).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });

    it('should not render the saved price if saved price is 0', () => {
        render(<PriceSummary totalPrice={100} savedPrice={0} />);

        expect(screen.queryByText('You saved: $10.00')).not.toBeInTheDocument();
    });

    it('should render the original price if saved price is greater than 0', () => {
        render(<PriceSummary totalPrice={100} savedPrice={10} />);

        expect(screen.getByText(/Original Price:/)).toBeInTheDocument();
        expect(screen.getByText('$110.00')).toBeInTheDocument();
        expect(screen.getByText('You saved: $10.00')).toBeInTheDocument();
        expect(screen.getByText(/Total Price:/)).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
    });
});
