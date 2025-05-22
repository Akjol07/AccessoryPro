export interface IRegisterForm {
  username: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IGoogleLoginForm {
  access_token: string;
}

export interface IRegisterUserResponse {
  token: { accessToken: string; refreshToken: string };
  user: {};
}

export interface IUser {
  id: string;
  email: string;
  username: string;
}

export interface ILoginUserResponse {
  token: { accessToken: string; refreshToken: string };
  user: {};
}
