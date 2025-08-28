"use client";

import { Button, Image, Input, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Swal from "sweetalert2";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"; // Asegúrate de importar correctamente
import { selectProduct } from "@/store/slices/selectedProductSlice"; // Asegúrate de importar correctamente
import { Product } from "@/types/selectedProduct.type";
import { allProducts } from "@/store/slices/productsSlice";
import { updateInfoProduct } from "@/services/products/putUpdateProduct";
import { uploadFile } from "@/hooks/useFirebase";

const initialProductState: Product = {
  _id: "",
  nameProduct: "",
  descriptionProduct: "",
  imageProduct: "",
  price: 0,
  priceOff: null,
  saving: null,
  createdAt: "",
  updatedAt: "",
  __v: 0,
  link4lifeProduct: "",
  uuidImage: "",
};

export const UpdateProduct = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state: RootState) => state.productSelect.selectedProduct
  );
  const dataUser = useSelector((state: RootState) => state.user.userInfo);
  console.log(dataUser);
  const products = useAppSelector(
    (state: RootState) => state.products.allProducts
  );
  const [isEditing, setIsEditing] = useState(false);
  const [productData, setProductData] = useState<Product>(initialProductState);
  const [modifiedData, setModifiedData] = useState<Partial<Product>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  console.log(file);
  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
      setPreviewImage(selectedProduct.imageProduct);
    }
  }, [selectedProduct]);

  const handleEditProduct = () => {
    setIsEditing(true);
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

  const handleSaveChanges = async () => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      // Convertir a función async
      if (result.isConfirmed) {
        const dataProduct = { ...productData, ...modifiedData };
        const uid = dataUser?.uid || "";

        try {
          if (file) {
            const uuidImage = productData.uuidImage || "";
            const result = await uploadFile(file, uuidImage);
            dataProduct.imageProduct = result;
          }

          const update = await updateInfoProduct({ uid, dataProduct });
          dispatch(selectProduct(dataProduct));

          Swal.fire("Saved!", "", "success");
          setIsEditing(false);
        } catch (error) {
          console.error("Error updating product:", error);
          Swal.fire(
            "Error!",
            "There was a problem saving the changes.",
            "error"
          );
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const handleChange = (fieldName: keyof Product, value: string | number) => {
    setModifiedData({ ...modifiedData, [fieldName]: value });
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setPreviewImage(productData.imageProduct); // Restablecer a la imagen original
    setModifiedData({});
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div className="w-[100%] h-[100%] p-4 flex flex-col justify-center items-center bg-[#eae4e4]">
      <div className="w-[90%] p-9 rounded-xl flex flex-col gap-10 justify-center items-center bg-[var(--white)] ">
        <div className="w-[300px]">
          <h2 className="font-bold text-[var(--blue)]">Imagen del producto</h2>
          <Image
            width={200}
            height={100}
            src={previewImage ?? productData.imageProduct}
            alt="Product Image"
            className="mt-2"
          />
          {isEditing && (
            <input
              required
              placeholder="hola"
              title="Por favor, complete este campo"
              type="file"
              accept="image/*"
              // className=""
              onClick={(e) => e.stopPropagation()}
              onChange={handleFileChange}
            />
          )}
        </div>
        <div className="flex flex-col justify-center items-start w-[300px]">
          <h2 className="font-bold text-[var(--blue)] items-start">
            Nombre del Producto
          </h2>
          {isEditing ? (
            <Input
              color="default"
              value={modifiedData.nameProduct || productData.nameProduct}
              onChange={(e) => handleChange("nameProduct", e.target.value)}
            />
          ) : (
            <span>{productData.nameProduct}</span>
          )}
        </div>

        <div className="w-[300px]">
          <h2 className="font-bold text-[var(--blue)]">Descripción</h2>
          {isEditing ? (
            <div>
              {/* <Input
                value={
                  modifiedData.descriptionProduct ||
                  productData.descriptionProduct
                }
                onChange={(e) =>
                  handleChange("descriptionProduct", e.target.value)
                }
                color="default"
              /> */}
              <Textarea
                // label="Description"
                // placeholder="Enter your description"
                color="default"
                className="max-w-xs text-[var(--black)]"
                value={
                  modifiedData.descriptionProduct ||
                  productData.descriptionProduct
                }
                onChange={(e) =>
                  handleChange("descriptionProduct", e.target.value)
                }
              />
            </div>
          ) : (
            <span className="w-[5500px]">
              {showFullDescription
                ? productData.descriptionProduct
                : `${productData.descriptionProduct.slice(0, 100)}`}
              {productData.descriptionProduct.length > 100 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-500 underline ml-1"
                >
                  {showFullDescription ? "Leer menos" : "Leer más"}
                </button>
              )}
            </span>
          )}
        </div>
        <div className="w-[300px]">
          <h2 className="font-bold text-[var(--blue)] items-start">Precio</h2>
          {isEditing ? (
            <Input
              value={
                modifiedData.price?.toString() || productData.price.toString()
              }
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value))
              }
              color="default"
            />
          ) : (
            <p className="text-start">{productData.price}</p>
          )}
        </div>
        <div className="w-[300px]">
          <h2 className="font-bold text-[var(--blue)] items-start">
            Precio Descuento
          </h2>
          {isEditing ? (
            <Input
              value={
                modifiedData.priceOff?.toString() ||
                productData.priceOff?.toString() ||
                ""
              }
              onChange={(e) =>
                handleChange("priceOff", parseFloat(e.target.value))
              }
              color="default"
            />
          ) : (
            <span className="items-start">{productData.priceOff}</span>
          )}
        </div>
        <div className="flex flex-col justify-center items-start w-[300px]">
          <h2 className="font-bold text-[var(--blue)]">Ahorro</h2>
          {isEditing ? (
            <Input
              value={
                modifiedData.saving?.toString() ||
                productData.saving?.toString() ||
                ""
              }
              onChange={(e) =>
                handleChange("saving", parseFloat(e.target.value))
              }
              color="default"
            />
          ) : (
            <span>{productData.saving}</span>
          )}
        </div>
        <div className="w-[300px]">
          <h2 className="font-bold text-[var(--blue)]">
            Link de producto 4life
          </h2>
          {isEditing ? (
            <Input
              value={
                modifiedData.link4lifeProduct || productData.link4lifeProduct
              }
              onChange={(e) => handleChange("link4lifeProduct", e.target.value)}
              color="default"
            />
          ) : (
            <span>{productData.link4lifeProduct}</span>
          )}
        </div>
        <div className="flex gap-2 mt-5 mb-5">
          {isEditing ? (
            <>
              <Button color="default" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button color="primary" onClick={handleSaveChanges}>
                Guardar Cambios
              </Button>
            </>
          ) : (
            <div>
              {/* <Link href={"/dashboard/products"}> */}
              <Button color="primary" onClick={handleEditProduct}>
                Editar Producto
              </Button>
              {/* </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
