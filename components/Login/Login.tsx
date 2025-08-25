"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../icons/Login/EyeSlashfilledIcon";
import { EyeFilledIcon } from "../icons/Login/EyeFilledICon";
import { Button } from "../Button/Button";
import styles from "./Login.module.css";
import Swal from "sweetalert2";
import { useRouter} from "next/navigation";
import { signIn } from "next-auth/react";




export const Login = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [errors, setErrors] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      const errorMessage = responseNextAuth.error;
      console.error(responseNextAuth?.error);
      if (errorMessage.includes("Failed to parse URL from undefined/auth")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor.Por favor, intenta nuevamente más tarde.",
        });
      } else if (errorMessage.includes("Server error")) {
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Hubo un problema con el servidor. Por favor, intenta nuevamente más tarde.",
        });
      } else {
        setErrors(errorMessage.split(","));
        Swal.fire({
          icon: "error",
          title: "Error en autenticación",
          text: "Usuario o contraseña incorrecta",
        });
      }

      return;
    }

     
        
   router.push("/dashboard/products");
       
   
  };

  return (
    <form
      action=""
      className={styles["container__login"]}
      onSubmit={handleSubmit}
    >
      <div className={`${styles["flex-container"]} ${styles["shadow-box"]}`}>
        <img
          src="./Login/login.svg"
          alt="image login"
          className={styles["login__image"]}
        />
        <h1 className={styles["login__title"]}>Iniciar Sessión</h1>
        <Input
          id="emailLogin"
          name="loginEmail"
          type="email"
          errorMessage="El emailes obligatorio"
          placeholder=" "
          label="Correo Electrónico"
          onChange={(event) => setEmail(event.target.value)}
          labelPlacement={"inside"}
          size={"md"}
        />
        <Input
          id="passwordLogin"
          name="loginPassword"
          value={password}
          placeholder=""
          label="Contraseña"
          errorMessage="La contraseña es obligatorio"
          onChange={(event) => setPassword(event.target.value)}
          size={"md"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <Button className="w-full">Iniciar sessión</Button>
      </div>
    </form>
  );
};
