import { ICompanySimple } from "./CompaniesApi";
import { store } from "../app/store";
import { popLoad, pushLoad } from "../app/slices/laoderSlice";

export interface ICompany extends ICompanySimple {}
const company: ICompany = {
  name: "Aktivni planet bovec",
  devices: 5,
  images: 1235,
  notifications: 51,
  id: 0,
  enabled: true,
};

export const fetchCompany = (url: string) => {
  return new Promise<ICompany>((resolve, reject) => {
    store.dispatch(pushLoad());
    setTimeout(() => {
      store.dispatch(popLoad());
      resolve(company);
    }, 1500);
  });
};
