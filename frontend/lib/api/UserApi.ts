import type {
  RegisterResponse,
  RegisterUserPayload,
  LoginUserPayload,
  LoginResponse,
} from "@models/user";

export const userRegister = async (
  payload: RegisterUserPayload
): Promise<RegisterResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users`, {
    method: "POST",
    body: payload,
  });
};

export const userLogin = async (
  payload: LoginUserPayload
): Promise<LoginResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users/login`, {
    method: "POST",
    body: payload,
  });
};

export const userDetail = async (token: string): Promise<RegisterResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users/current`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const userUpdateProfile = async (
  token: string,
  name: string
): Promise<RegisterResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users/current`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: { name },
  });
};

export const userUpdatePassword = async (
  token: string,
  password: string
): Promise<RegisterResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users/current`, {
    method: "PATCH",
    headers: {
      Authorization: token,
    },
    body: { password },
  });
};

export const userLogout = async (token: string): Promise<boolean> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/users/current`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};
