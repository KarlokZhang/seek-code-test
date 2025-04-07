import { renderHook } from '@testing-library/react';

import { MockedCustomerProvider } from '../test/fixtures';
import { useCustomer } from './useCustomer';

describe('useCustomer', () => {
    it('should return default customer context when used outside of CustomerProvider', () => {
        const { result } = renderHook(() => useCustomer(), {
            wrapper: ({ children }) => <MockedCustomerProvider>{children}</MockedCustomerProvider>,
        });

        expect(result.current.customerCode).toBe('default');
    });

    it('should return customer context when used within CustomerProvider', () => {
        const mockCustomerCode = 'axilCoffeeRoasters';
        const mockSetCustomerCode = jest.fn();

        const { result } = renderHook(() => useCustomer(), {
            wrapper: ({ children }) => (
                <MockedCustomerProvider customerCode={mockCustomerCode} setCustomerCode={mockSetCustomerCode}>
                    {children}
                </MockedCustomerProvider>
            ),
        });

        expect(result.current.customerCode).toBe(mockCustomerCode);
        expect(result.current.setCustomerCode).toBe(mockSetCustomerCode);
    });
});
