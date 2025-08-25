interface UserData {
  name: string;
  lastname: string;
  description: string;
  email: string;
  country: string;
  city: string;
  phone: number;
}

const initialState: UserData = {
  name: "",
  lastname: "",
  description: "",
  email: "",
  country: "",
  city: "",
  phone: 0,
};

const updateUser = async (uid: string, modifiedFields: Partial<UserData>) => {
  console.log(uid, modifiedFields);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updateInfo/${uid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedFields),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export { updateUser };
