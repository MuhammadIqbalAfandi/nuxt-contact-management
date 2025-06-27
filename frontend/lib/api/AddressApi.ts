import type {
  AddressSingleResponse,
  AddressListResponse,
  CreateAddressPayload,
} from "@models/address";

export const addressCreate = async (
  token: string,
  contactId: number,
  payload: CreateAddressPayload
): Promise<AddressSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(
    `${config.public.apiBase}/contacts/${contactId}/addresses`,
    {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: payload,
    }
  );
};

export const addressUpdate = async (
  token: string,
  contactId: number,
  addressId: number,
  payload: CreateAddressPayload
): Promise<AddressSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(
    `${config.public.apiBase}/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        Authorization: token,
      },
      body: payload,
    }
  );
};

export const addressDelete = async (
  token: string,
  contactId: number,
  addressId: number
): Promise<boolean> => {
  const config = useRuntimeConfig();

  return await $fetch(
    `${config.public.apiBase}/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};

export const addressDetails = async (
  token: string,
  contactId: number
): Promise<AddressListResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(
    `${config.public.apiBase}/contacts/${contactId}/addresses`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};

export const addressDetail = async (
  token: string,
  contactId: number,
  addressId: number
): Promise<AddressSingleResponse> => {
  const config = useRuntimeConfig();

  return await $fetch(
    `${config.public.apiBase}/contacts/${contactId}/addresses/${addressId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    }
  );
};
