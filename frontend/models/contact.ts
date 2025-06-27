export interface Paging {
  current_page: number;
  size: number;
  total_page: number;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface ContactSingleResponse {
  data: Contact;
}

export interface ContactSearchResponse {
  data: Contact[];
  paging: Paging;
}

export type CreateContactPayload = Omit<Contact, "id">;

export interface SearchContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  page?: number;
  size?: number;
}
