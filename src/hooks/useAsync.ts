import { useEffect, useState } from 'react';

type UseAsyncState<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
};

export function useAsync<T>(asyncFn: () => Promise<T>) {
    const [state, setState] = useState<UseAsyncState<T>>({
        data: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setState({ data: null, loading: true, error: null });

            try {
                const result = await asyncFn();
                if (isMounted) {
                    setState({ data: result, loading: false, error: null });
                }
            } catch (error) {
                if (isMounted) {
                    setState({ data: null, loading: false, error: error as Error });
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [asyncFn]);

    return state;
}
