export interface IFormInput {
  username: string;
  password: string;
  email?: string;
}

export interface ILoginBack{
  okay:boolean
}

export function onSubmitRegister(values: IFormInput) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values);
      resolve({okay:true});
    }, 1000);
  });
}

export function onSubmitLogin(values: IFormInput) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values);
      resolve({okay:true});
    }, 1000);
  });
}
