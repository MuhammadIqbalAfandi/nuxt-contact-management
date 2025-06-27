export interface Address {
  id: number;
  street: string;
  city: string;
  province: string;
  country: string;
  postal_code: string;
}

export interface AddressSingleResponse {
  data: Address;
}

export interface AddressListResponse {
  data: Address[];
}

export type CreateAddressPayload = Omit<Address, "id">;
