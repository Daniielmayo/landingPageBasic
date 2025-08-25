export const getProducts = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
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
