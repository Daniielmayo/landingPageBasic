interface Props {
  uid: string;
  nameProduct: string;
  descriptionProduct: string;
  price: number;
  priceOff?: number;
  saving?: number;
  link4lifeProduct: string;
  image: string;
  uuidImage?: string;
}

export const createProduct = async ({
  uid,
  nameProduct,
  descriptionProduct,
  price,
  priceOff,
  saving,
  link4lifeProduct,
  image,
  uuidImage,
}: Props) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/createProduct`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        nameProduct,
        descriptionProduct,
        imageProduct: image,
        price,
        priceOff,
        saving,
        link4lifeProduct,
        uuidImage,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Unexpected response type: " + contentType);
  }

  const json = await response.json();
  return json;
};
