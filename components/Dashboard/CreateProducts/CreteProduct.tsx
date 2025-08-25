"use client";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import styles from "./CreateProudct.module.css";
import { useState } from "react";
import { createProduct } from "@/services/products/postCreateProduct";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { uploadFile } from "@/hooks/useFirebase";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export const CreateProduct = () => {
  const { data: session } = useSession();
  const uid = session?.user.uid ?? "";

  const [isValid, setIsValid] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    uid: "",
    nameProduct: "",
    descriptionProduct: "",
    imageProduct: "",
    price: 0,
    priceOff: 0,
    saving: 0,
    link4lifeProduct: "",
    uuidImage: "",
  });
  console.log(formData);
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files ?? [];

    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewImage(imageUrl);
    }
  };

  const handleSaveChanges = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    try {
      if (formData.price <= 0) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "El precio del producto debe ser mayor que 0",
        });
        return;
      }

      if (file) {
        const uuidImage = uuidv4();

        const result = await uploadFile(file, uuidImage);

        setImage(result);

        const formDataWithUid = { ...formData, image: result, uid, uuidImage };
        const isSuccess = await createProduct(formDataWithUid);

        if (isSuccess) {
          setFile(null);
          setPreviewImage("");
          setFormData({
            uid: "",
            nameProduct: "",
            descriptionProduct: "",
            imageProduct: "",
            price: 0,
            priceOff: 0,
            saving: 0,
            link4lifeProduct: "",
            uuidImage: "",
          });

          Swal.fire({
            icon: isSuccess ? "success" : "error",
            title: isSuccess ? "Producto creado" : "Error al crear el producto",
            text: isSuccess
              ? "Producto creado correctamente"
              : "No pudo crear el producto",
          }).then((result) => {
            if (
              result.isConfirmed ||
              result.dismiss === Swal.DismissReason.timer
            ) {
              window.location.href = "/dashboard/products";
            }
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al cargar la imagen!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo crear el producto",
      });
    }
  };

  return (
    <form
      action=""
      className={styles["createProduct__content--form"]}
      onSubmit={handleSaveChanges}
    >
      <h2 className={styles["createProduct__title--form"]}>Crear producto</h2>
      <div className="w-[90%] flex flex-col justify-center md:w-[60%] lg:w-[70%] bg-[var(--white)] p-3 rounded-md">
        {previewImage ? (
          <div>
            <Image
              width={200}
              height={100}
              src={previewImage}
              alt="NextUI Image with fallback"
            />
          </div>
        ) : null}
        <label className="text-[var(--darkGray)] mb-3">
          Selecciona tu foto
          <span className="text-[var(--red)]">*</span>
        </label>
        <input
          required
          title="Por favor, complete este campo"
          type="file"
          accept="image/*"
          className="w-[90%] justify-center md:w-[60%] lg:w-[70%] bg-[var(--white)]"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            handleFileChange(e);
            setFile(e.target.files![0]);
          }}
        />
      </div>

      <Input
        isRequired
        isInvalid={isValid}
        errorMessage="El nombre del producto es obligatorio"
        type="text"
        label="Nombre del producto"
        placeholder=""
        className="w-[90%] justify-center md:w-[60%] lg:w-[70%]"
        value={formData.nameProduct}
        name="nameProduct"
        onChange={handleInputChange}
      />

      {/* <Input
        placeholder=""
        label="Description del producto"
        isRequired
        isInvalid={isValid}
        errorMessage="La descripción del producto es obligatorio"
        type="text"
        className="w-[90%] justify-center md:w-[60%] lg:w-[70%]"
        value={formData.descriptionProduct}
        name="descriptionProduct"
        onChange={handleInputChange}
      /> */}

      <Textarea
        label="Description"
        placeholder=""
        labelPlacement="inside"
        isRequired
        isInvalid={isValid}
        errorMessage="La descripción del producto es obligatorio"
        type="text"
        className="w-[100%] justify-center md:w-[60%] lg:w-[70%]"
        value={formData.descriptionProduct}
        name="descriptionProduct"
        onChange={handleInputChange}
      />

      <Input
        isRequired
        isInvalid={isValid}
        errorMessage="El precio del producto es obligatorio"
        className="w-[90%] justify-center md:w-[60%] lg:w-[70%]"
        onChange={handleInputChange}
        type="number"
        label="Precio del producto"
        placeholder=""
        labelPlacement="inside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">$</span>
          </div>
        }
        value={formData.price !== 0 ? formData.price?.toString() : ""}
        name="price"
      />
      <Input
        type="number"
        label="Descuento del producto"
        placeholder=""
        labelPlacement="inside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">%</span>
          </div>
        }
        className="w-[90%] justify-center md:w-[60%] lg:w-[70%]"
        onChange={handleInputChange}
        value={formData.priceOff !== 0 ? formData.priceOff?.toString() : ""}
        name="priceOff"
      />
      <Input
        isRequired
        isInvalid={isValid}
        errorMessage="La URL del producto en 4LIFE es obligatorio"
        type="text"
        label="url del prodcuto 4life"
        placeholder="nextui.org"
        labelPlacement="inside"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small"></span>
          </div>
        }
        className="w-[90%] justify-center md:w-[60%] lg:w-[70%]"
        onChange={handleInputChange}
        value={formData.link4lifeProduct}
        name="link4lifeProduct"
      />
      <div className="flex gap-5 mb-10">
        <Link href={"/dashboard/products"}>
          <Button color="danger">
            Cancelar
          </Button>
        </Link>

        <Button color="primary" type="submit">
          Crear producto
        </Button>
      </div>
    </form>
  );
};
