import { PRODUCT_CODE } from '@/constants';
import { MockedCartProvider } from '@/test/fixtures';

import { renderHook } from '@testing-library/react';

import { useCart } from './useCart';

describe('useCart', () => {
    it('should return default context when used outside of CartProvider', () => {
        const { result } = renderHook(() => useCart(), { wrapper: ({ children }) => <>{children}</> });
        expect(result.current).toEqual({
            items: {},
            addItem: expect.any(Function),
            removeItem: expect.any(Function),
            clearCart: expect.any(Function),
            totalPrice: 0,
            savedPrice: 0,
            error: undefined,
            isLoading: false,
        });
    });

    it('should return cart context when used within CartProvider', () => {
        const mockItems = { [PRODUCT_CODE.CLASSIC]: 2 };
        const mockAddItem = jest.fn();
        const mockRemoveItem = jest.fn();
        const mockClearCart = jest.fn();

        const { result } = renderHook(() => useCart(), {
            wrapper: ({ children }) => (
                <MockedCartProvider
                    items={mockItems}
                    addItem={mockAddItem}
                    removeItem={mockRemoveItem}
                    clearCart={mockClearCart}
                    totalPrice={100}
                    savedPrice={10}
                >
                    {children}
                </MockedCartProvider>
            ),
        });

        expect(result.current.items).toEqual(mockItems);
        expect(result.current.addItem).toBe(mockAddItem);
        expect(result.current.removeItem).toBe(mockRemoveItem);
        expect(result.current.clearCart).toBe(mockClearCart);
        expect(result.current.totalPrice).toBe(100);
        expect(result.current.savedPrice).toBe(10);
    });
});
