import { renderHook, waitFor } from '@testing-library/react';

import { useAsync } from './useAsync';

describe('useAsync', () => {
    it('should calls async function and updates state', async () => {
        const asyncFn = jest.fn().mockResolvedValue('hello');

        const { result } = renderHook(() => useAsync(asyncFn));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBe(null);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBe('hello');
            expect(result.current.error).toBe(null);
        });

        expect(asyncFn).toHaveBeenCalled();
    });

    it('should sets error state on rejection', async () => {
        const asyncFn = jest.fn().mockRejectedValue(new Error('fail'));

        const { result } = renderHook(() => useAsync(asyncFn));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
            expect(result.current.data).toBe(null);
            expect(result.current.error?.message).toBe('fail');
        });
    });

    it('should not update state after unmount', async () => {
        const asyncFn = () => new Promise((resolve) => setTimeout(() => resolve('delayed'), 100));

        const { result, unmount } = renderHook(() => useAsync(asyncFn));

        unmount();

        await new Promise((resolve) => setTimeout(resolve, 150));
        expect(result.current.data).toBe(null);
    });
});
