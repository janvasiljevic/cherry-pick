import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useBidsList() {
  const { data, error } = useSWR(`/api/bid`, fetcher);

  return {
    bids: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export const createBid = (body: any) => axios.post('api/bid', body);
