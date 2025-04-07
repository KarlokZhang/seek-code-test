import { Checkout } from './components/Checkout/Checkout';
import { CartProvider } from './context/cart/CartContextProvider';
import { CustomerProvider } from './context/customer/CustomerContextProvider';

function App() {
    return (
        <CustomerProvider>
            <CartProvider>
                <Checkout heading="Shopping Cart Checkout" />
            </CartProvider>
        </CustomerProvider>
    );
}

export default App;
