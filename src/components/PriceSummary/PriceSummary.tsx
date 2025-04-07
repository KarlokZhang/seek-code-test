import { PriceSummaryProps } from './PriceSummary.types';

export const PriceSummary = ({ totalPrice, savedPrice }: PriceSummaryProps) => {
    const hasDiscount = savedPrice > 0;

    return (
        <footer className="mt-8 border-t pt-4" aria-labelledby="summary-heading">
            <h2 id="summary-heading" className="text-lg font-semibold mb-2">
                Summary
            </h2>

            {hasDiscount && (
                <p>
                    Original Price:{' '}
                    <span className="line-through text-gray-500">${(totalPrice + savedPrice).toFixed(2)}</span>
                </p>
            )}

            {savedPrice > 0 && <p className="text-green-700">You saved: ${savedPrice.toFixed(2)}</p>}

            <p>
                Total Price: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
        </footer>
    );
};
