export const changePassword = async (id: string, password: string) => {
  try {
    const dataResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      }
    );
    return dataResponse;
  } catch (error) {
    console.error(error);
  }
};
