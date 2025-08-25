"use client";
import { Button, Image, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";
import { PasswordValidation } from "@/services/user/postValidatePassword";
import { EyeSlashFilledIcon } from "@/components/icons/Login/EyeSlashfilledIcon";
import { EyeFilledIcon } from "@/components/icons/Login/EyeFilledICon";
import { changePassword } from "@/services/user/putChangePassword";
import { useRouter } from "next/navigation";

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
export const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleRepeat, setIsVisibleRepeat] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityRepeat = () => setIsVisibleRepeat(!isVisibleRepeat);
  useEffect(() => {
    if (
      currentPassword.length > 0 &&
      password.length > 0 &&
      password2.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [currentPassword, password, password2]);

  const resetSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire(
        "Error de autenticación",
        "Las contraseñas no son iguales",
        "error"
      );
      return;
    }

    try {
      if (session?.user?.uid !== undefined) {
        const changeUserPassword = await changePassword(
          session?.user?.uid,
          password
        );
        Swal.fire({
          icon: "success",
          title: "Contraseña modificada",
          text: "Los cambios en tu perfil han sido guardados exitosamente",
          didClose: () => {
            router.push("/dashboard/products");
          },
        });
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente",
        "error"
      );
    }
  };

  const validateUserPassword = async () => {
    if (session?.user?.uid !== undefined) {
      const validatePasswordData = await PasswordValidation(
        session?.user?.uid,
        currentPassword
      );

      if (validatePasswordData.ok) {
        if (currentPassword === password) {
          Swal.fire(
            "Error de validación",
            "La contraseña actual y la contraseña nueva deben ser diferentes",
            "error"
          );
        } else {
          return true;
        }
      } else {
        Swal.fire(
          "Contraseña actual incorrecta.",
          validatePasswordData.msg,
          "warning"
        );
        return false;
      }
    }
  };

  const validateSubmitPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const isPasswordValid = await validateUserPassword();

      if (isPasswordValid) {
        await resetSubmitPassword(e);
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al validar la contraseña", "error");
    }
  };

  const buttonColor = isButtonDisabled ? "default" : "primary";
  return (
    <div className="w-[100%] h-[100vh] flex flex-col justify-center items-center bg-[#eae4e4]">
      <form
        action=""
        onSubmit={validateSubmitPassword}
        className="w-[80%] p-9 flex flex-col justify-center items-center gap-2 bg bg-[var(--white)] rounded-xl"
      >
        <h1 className="text-center font-bold text-xl mb-6">
          Cambio de contraseña
        </h1>
        <div className="mb-4">
          <h2 className="font-bold">Contraseña actual</h2>

          <Input
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            placeholder=""
            // label="Contraseña"
            errorMessage="La contraseña es obligatorio"
            onChange={(event) => setCurrentPassword(event.target.value)}
            color="primary"
            size={"md"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityCurrent}
              >
                {isVisibleCurrent ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleCurrent ? "text" : "password"}
          />
        </div>
        <div className="mb-4">
          <h2 className="font-bold">Nueva contraseña</h2>
          <Input
            id="password"
            name="password"
            value={password}
            placeholder=""
            errorMessage="La contraseña es obligatorio"
            onChange={(event) => setPassword(event.target.value)}
            color="primary"
            size={"md"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityNew}
              >
                {isVisibleNew ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleNew ? "text" : "password"}
          />
        </div>
        <div className="mb-4">
          <h2 className="font-bold">Repetir contraseña</h2>
          <Input
            id="password2"
            name="password2"
            value={password2}
            placeholder=""
            errorMessage="La contraseña es obligatorio"
            onChange={(event) => setPassword2(event.target.value)}
            color="primary"
            size={"md"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityRepeat}
              >
                {isVisibleRepeat ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisibleRepeat ? "text" : "password"}
          />
        </div>
        <Button color={buttonColor} type="submit" disabled={isButtonDisabled}>
          Cambiar contraseña
        </Button>
      </form>
    </div>
  );
};
