import type {
  CreateContactPayload,
  ContactSingleResponse,
  SearchContactPayload,
  ContactSearchResponse,
} from "@models/contact";

export const contactCreate = async (
  token: string,
  payload: CreateContactPayload
): Promise<ContactSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/contacts`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: payload,
  });
};

export const contactDetails = async (
  token: string,
  payload: SearchContactPayload
): Promise<ContactSearchResponse> => {
  const config = useRuntimeConfig();

  const params = new URLSearchParams();

  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, value.toString());
    }
  });

  const url = new URL(`${config.public.apiBase}/contacts?${params.toString()}`);

  return await $fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const contactDetail = async (
  token: string,
  contactId: number
): Promise<ContactSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/contacts/${contactId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const contactDelete = async (
  token: string,
  contactId: number
): Promise<boolean> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/contacts/${contactId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: token,
    },
  });
};

export const contactUpdate = async (
  token: string,
  contactId: number,
  payload: CreateContactPayload
): Promise<ContactSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(`${config.public.apiBase}/contacts/${contactId}`, {
    method: "PUT",
    headers: {
      Authorization: token,
    },
    body: payload,
  });
};
