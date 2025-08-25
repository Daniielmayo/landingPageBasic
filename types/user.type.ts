export interface User {
  ok?: boolean;
  uid: string;
  lastname: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: number | null;
  image: string;
  // admin:boolean;
}
