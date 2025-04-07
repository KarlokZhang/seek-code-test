import { Product } from '@/types/product.types';

export interface ProductActionProps {
    product: Product;
    quantity: number;
    onRemove: () => void;
    onAdd: () => void;
}
