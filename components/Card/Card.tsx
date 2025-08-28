"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import styles from "./CardProduct.module.css";
import Link from "next/link";
interface Props {
  src: string;
  title: string;
  price: number;
  description: string;
  link4lifeProduct: string;
}

export const CardProduct = ({
  src,
  title,
  price,
  description,
  link4lifeProduct,
}: Props) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = description?.slice(0, 100);
  return (
    <div className={styles["cardProduct"]}>
      <Link href={link4lifeProduct} target="_blank">
        <Card className="py-4 w-[300px] cursor-pointer">
          <CardBody className="overflow-visible flex w-[100%] items-center">
            <Image
              alt={title}
              className="object-cover rounded-xl cursor-pointer"
              src={src}
              width={150}
            />
            <div className="border-1 w-[100%] border-solid border-[#ffb142] mt-3"></div>
          </CardBody>

          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start top-0">
            <h3 className="text-[var(--black)] transition-colors text-large hover:text-[var(--blue)]">
              {title}
            </h3>
            <p className="text-[var(--darkGrayGradient)]">
              {showFullDescription ? description : truncatedDescription}
              {description.length > 100 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleDescription();
                  }}
                  className="text-blue-500 underline ml-1"
                >
                  {showFullDescription ? "Ver menos" : "Ver más"}
                </button>
              )}
            </p>
            <small className="text-[var(--green)] font-bold text-[18px]">$ {price}.00</small>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};
