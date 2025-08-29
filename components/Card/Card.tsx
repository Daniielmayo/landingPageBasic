"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import styles from "./CardProduct.module.css";

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
  const toggleDescription = () => setShowFullDescription(!showFullDescription);

  const truncatedDescription = description?.slice(0, 100);

  return (
    <>
      {/* <Link href={link4lifeProduct} target="_blank"> */}
      <Card className="w-full max-w-md hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden border border-gray-200 bg-white flex flex-col gap-4">
        <CardBody>
          <Image
            isZoomed
            alt={title}
            src={src}
            width={500}
            height={200}
            className={"object-cover w-full h-44 rounded-t-xl rounded-b-none"}
          />
        </CardBody>

        <CardHeader className={styles.textContent}>
          <h3 className="text-xl font-semibold text-[var(--black)] hover:text-[var(--blue)] transition-colors">
            {title}
          </h3>

          <p className="text-sm text-gray-600 leading-relaxed">
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

          <div className="text-lg font-bold text-[var(--green)] ">
            $ {price}.00
          </div>
        </CardHeader>
      </Card>
      {/* </Link> */}
    </>
  );
};
