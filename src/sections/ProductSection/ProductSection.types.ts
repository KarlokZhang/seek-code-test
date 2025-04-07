import { Product } from '@/types/product.types';

export interface ProductSectionProps {
    heading: string;
    products: Product[] | null;
}
