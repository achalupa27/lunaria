import { useSuspenseQuery } from '@tanstack/react-query';
import { readAssetsService } from '../services/assets/read-assets-service';

const useFetchAssets = () => {
    return useSuspenseQuery({
        queryKey: ['assets'],
        queryFn: () => readAssetsService(),
        retry: 3,
        staleTime: 1000 * 60,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default useFetchAssets;
