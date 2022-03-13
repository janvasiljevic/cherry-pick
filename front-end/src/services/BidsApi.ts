import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const fetcherArgs = (url: string, params: any) => axios.get(url, { params }).then((res) => res.data);

export function useBidsList(params: any) {
  const { data, error } = useSWR([`/api/bid`, params], fetcherArgs);

  return {
    bids: data as IBid[],
    isLoading: !error && !data,
    isError: error,
  };
}

export function useBidsUser() {
  const { data, error } = useSWR(`/api/user`, fetcher);

  return {
    bids: data.BidCreated as IBid[],
    isLoading: !error && !data.BidCreated,
    isError: error,
  };
}

export interface IBid {
  id: string;
  dateOfConfirmation: null | Date | string;
  status: string;
  description: string;
  typeOfProblem: string;
  tipAmount: number;
  createdAt: string;
  updatedAt: string;
  createdUserId: string;
  assistedUserId: null | string;
}

export const createBid = (body: any) => axios.post('api/bid', body);
