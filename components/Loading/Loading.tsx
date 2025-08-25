"use client";
import { CSSProperties, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./Loading.module.css";

export const Loading = () => {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#36d7b7",
  };

  const [color, setColor] = useState("#0f5765");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, []);

  return (
    <div className={styles["continer-loading"]}>
      {loading ? (
        <ClipLoader
          color={color}
          loading={true}
          cssOverride={override}
          size={60}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : null}
    </div>
  );
};
