import { ProductCard } from '@/components/ProductCard/ProductCard';
import { useCustomer } from '@/hooks/useCustomer';
import { getDiscountByProduct } from '@/utils/discount/getDiscountByProduct';
import { getDiscountMessage } from '@/utils/discount/getDiscountMessage';

import { ProductSectionProps } from './ProductSection.types';

export const ProductSection = ({ products, heading }: ProductSectionProps) => {
    const { pricingRule } = useCustomer();
    if (!products) return null;

    return (
        <section className="" role="section" aria-label="Products">
            <h2 className="text-xl font-bold mb-4">{heading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => {
                    const discountForProduct = getDiscountByProduct(product.code, pricingRule);
                    const discountMessage = getDiscountMessage(discountForProduct);

                    return (
                        <ul
                            key={product.code}
                            className="border rounded-xl shadow-sm p-4 flex flex-col justify-between"
                            role="list"
                            aria-label={product.name}
                        >
                            <ProductCard product={product} discountMessage={discountMessage} />
                        </ul>
                    );
                })}
            </div>
        </section>
    );
};
