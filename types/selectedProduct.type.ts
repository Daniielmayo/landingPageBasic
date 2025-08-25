export interface Product {
  _id: string;
  nameProduct: string;
  descriptionProduct: string;
  imageProduct: string;
  price: number;
  priceOff: number | null;
  saving: number | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  link4lifeProduct: string;
  uuidImage?: string;
}
