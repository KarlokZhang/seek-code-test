import { useCart } from '@/hooks/useCart';

import { Notification } from '../Notification';
import { ProductAction } from '../ProductAction/ProductAction';
import { ProductCardProps } from './ProductCard.types';

export const ProductCard = ({ product, discountMessage }: ProductCardProps) => {
    const { items, addItem, removeItem } = useCart();
    const quantity = items[product.code] || 0;

    return (
        <li className="flex flex-col gap-2" role="listitem" aria-label={product.name}>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-800 mb-2">{product.description}</p>
            <p className="text-sm font-medium">${product.price.toFixed(2)}</p>

            {discountMessage && <Notification message={discountMessage} type="success" styleClasses="mt-2" />}

            <ProductAction
                product={product}
                quantity={quantity}
                onAdd={() => addItem({ productCode: product.code, quantity: 1 })}
                onRemove={() => removeItem({ productCode: product.code, quantity: 1 })}
            />
        </li>
    );
};
