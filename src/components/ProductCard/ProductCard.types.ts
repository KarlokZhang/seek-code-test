import { Product } from '@/types/product.types';

export interface ProductCardProps {
    product: Product;
    discountMessage: string | null;
}
