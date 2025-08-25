interface ValidatePasswordResponse {
  ok: boolean;
  msg: string;
}
export const PasswordValidation = async (id: string, password: string) => {

  try {
    const responseValidate = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/validate-password/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      }
    );
    const responseData: ValidatePasswordResponse =
      await responseValidate.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("Error al validar la contraseña");
  }
};
