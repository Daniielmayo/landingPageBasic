import React, { ReactNode } from "react";
import styles from "./Button.module.css";

interface Props {
  children: ReactNode;
  onClick?: (event: any) => void;
  className?: string;
}

export const Button = ({ children, onClick, className }: Props) => {
  const buttonClassName = `${styles["button__component"]} ${className || ""}`;
  return (
    <button className={buttonClassName} type="submit">
      {children}
    </button>
  );
};
