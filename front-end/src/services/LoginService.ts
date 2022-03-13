import axios, { AxiosResponse } from 'axios';

export interface IFormInput {
  email: string;
  password: string;
}

export interface ILoginBack {
  okay: boolean;
}

export function onSubmitRegister(values: IFormInput) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values);
      resolve({ okay: true });
    }, 1000);
  });
}

export const onSubmitLogin = ({ email, password }: IFormInput): Promise<AxiosResponse<any, any>> =>
  axios.post('api/auth/login', { email, password });
