import { popLoad, pushLoad } from "../app/slices/laoderSlice";
import { useDispatch } from "react-redux";
import { store } from "../app/store";

export interface ICompanySimple {
  name: string;
  devices: number;
  images: number;
  notifications: number;
  id: number;
  enabled: boolean;
}

const companies: ICompanySimple[] = [
  {
    name: "Aktivni planet bovec",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: true,
  },
  {
    name: "Neki neki sasdas",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: true,
  },
  {
    name: "Aktivni planet bovec",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: false,
  },
  {
    name: "Aktivni planet bovec",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: true,
  },
  {
    name: "Aktivni planet bovec",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: false,
  },
  {
    name: "Aktivni planet bovec",
    devices: 5,
    images: 1235,
    notifications: 51,
    id: 0,
    enabled: true,
  },
];

export const fetchCompanies = () => {
  // const dispatch = useDispatch();
  store.dispatch(pushLoad());
  // dispatch(pushLoad());
  // dispatch(popLoad());
  return new Promise<ICompanySimple[]>((resolve, reject) => {
    setTimeout(() => {
      store.dispatch(popLoad());
      resolve(companies);
    }, 1500);
  });
};
