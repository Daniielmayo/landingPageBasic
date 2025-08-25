import { Product } from "@/types/selectedProduct.type";

interface Props {
  uid: string;
  dataProduct: Product;
}

export const updateInfoProduct = async ({ uid, dataProduct }: Props) => {
  const productId = dataProduct._id;
  console.log(uid, dataProduct);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${uid}/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        newData: dataProduct,
        
      }),
    }
  );
  if (!response.ok) {
    console.log(response);
    console.error("Network response was not ok");
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Unexpected response type: " + contentType);
  }

  const json = await response.json();
  return json;
};
