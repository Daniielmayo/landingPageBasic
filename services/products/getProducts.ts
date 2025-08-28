export const getProducts = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!backendUrl) {
    console.error("La variable de entorno NEXT_PUBLIC_BACKEND_URL no está definida.");
    return [];
  }

  try {
    new URL(backendUrl);
  } catch (error) {
    console.error(`La URL del backend proporcionada ('${backendUrl}') no es una URL válida.`);
    return [];
  }

  try {
    const response = await fetch(`${backendUrl}/products`);

    if (!response.ok) {
      console.error(`La respuesta de la red no fue exitosa: ${response.status} ${response.statusText}`);
      return [];
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error(`Tipo de respuesta inesperado: ${contentType}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
};
