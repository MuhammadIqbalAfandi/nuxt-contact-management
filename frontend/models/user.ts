interface User {
  username: string;
  name: string;
  token: string;
}

export interface RegisterResponse extends Omit<User, "token"> {
  data: User;
}

export interface LoginResponse {
  data: User;
}

export interface RegisterUserPayload extends Omit<User, "token"> {
  password: string;
}

export interface LoginUserPayload {
  username: string;
  password: string;
}
