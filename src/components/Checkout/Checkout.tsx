import { fetchProducts } from '@/api/fetchProducts';
import { CUSTOMERS } from '@/data/customer';
import { useAsync } from '@/hooks/useAsync';
import { useCart } from '@/hooks/useCart';
import { useCustomer } from '@/hooks/useCustomer';
import { ProductSection } from '@/sections/ProductSection/ProductSection';
import { CustomerCode } from '@/types/customer.types';

import { PriceSummary } from '../PriceSummary/PriceSummary';
import { Selector } from '../Selector/Selector';
import { CheckoutProps } from './Checkout.types';

export const Checkout = ({ heading }: CheckoutProps) => {
    const { totalPrice, savedPrice, clearCart } = useCart();
    const { customerCode, setCustomerCode } = useCustomer();

    const { data: products, loading } = useAsync(fetchProducts);

    const customerOptions = Object.entries(CUSTOMERS).map(([key, value]) => ({
        label: value,
        value: key,
    }));

    const handleCustomerChange = (value: string) => {
        setCustomerCode(value as CustomerCode);
        clearCart();
    };

    return (
        <main className="container mx-auto p-4" aria-labelledby="checkout-heading">
            <h1 id="checkout-heading" className="text-2xl font-bold mb-4">
                {heading}
            </h1>

            <Selector
                label="Select Customer"
                options={customerOptions}
                defaultOption={customerCode}
                onChange={handleCustomerChange}
            />

            {loading ? <div>Loading...</div> : <ProductSection products={products} heading="Products" />}

            <PriceSummary totalPrice={totalPrice} savedPrice={savedPrice} />
        </main>
    );
};
