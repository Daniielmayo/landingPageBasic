export interface Products {
  _id: string;
  nameProduct: string;
  descriptionProduct: string;
  imageProduct: string;
  price: number;
  priceOff: number | null;
  saving: number | null;
  link4lifeProduct: string;
  uuidImage?: string;
}

// Colección de productos
export type ProductsCollection = Products[];
