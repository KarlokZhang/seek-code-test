import { Button } from '../Button';
import { ProductActionProps } from './ProductAction.types';

export const ProductAction = ({ product, quantity, onRemove, onAdd }: ProductActionProps) => {
    return (
        <div className="mt-4 flex items-center justify-between" aria-label={`Quantity controls for ${product.name}`}>
            <Button
                type="button"
                ariaLabel={`Remove one ${product.name}`}
                onClick={onRemove}
                className="px-3 py-1 bg-red-100 text-red-800 rounded disabled:opacity-50"
                disabled={quantity === 0}
            >
                −
            </Button>
            <span className="px-3 py-1 text-center border-gray-300 border rounded">{quantity}</span>
            <Button
                type="button"
                ariaLabel={`Add one ${product.name}`}
                onClick={onAdd}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
            >
                ＋
            </Button>
        </div>
    );
};
