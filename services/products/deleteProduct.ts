export const deleteProduct = async (uid: string, productId: string) => {
  console.log(uid, productId);

  try {
    // Hacer la solicitud DELETE usando fetch
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${uid}/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(response);
      console.error("Network response was not ok");
    }
    //si la eliminacion es correcta mostramos un mensaje de confirmacion

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the request", error);
  }
};
