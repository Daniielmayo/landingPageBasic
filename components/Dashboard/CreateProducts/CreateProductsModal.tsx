// "use client";
// import React, { useState } from "react";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@heroui/react";
// import Swal from "sweetalert2";
// import { createProduct } from "@/services/products/postCreateProduct";
// import { PlusIcon } from "../icons/Dashboard/PlusIcon";
// import { useRouter } from "next/navigation";

// interface ProductData {
//   uid: string;
//   nameProduct: string;
//   descriptionProduct: string;
//   imageProduct: string;
//   price: number;
//   priceOff?: number;
//   saving?: number;
// }

// export const CreateProductsModal = () => {
//   const [formData, setFormData] = useState<ProductData>({
//     uid: "",
//     nameProduct: "",
//     descriptionProduct: "",
//     imageProduct: "",
//     price: 0,
//   });
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   // console.log(onOpen{true})
//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const handleClose = async () => {
//     if (
//       !formData.nameProduct ||
//       !formData.descriptionProduct ||
//       !formData.price
//     ) {
//       Swal.fire({
//         icon: "warning",
//         title: "¡Campos obligatorios faltantes!",
//         text: "Por favor, complete los campos: Nombre del producto, Descripción del producto y Precio del producto.",
//       });
//       return;
//     }

//     const result = await Swal.fire({
//       title: "¿Estás seguro de cerrar el modal?",
//       text: "Se perderán los cambios no guardados.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Guardar producto",
//       confirmButtonColor: "var(--green)",
//       cancelButtonText: "Cancelar",
//       cancelButtonColor: "#d33",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       try {
//         const response = await createProduct(formData);
//         console.log("Producto creado con éxito:", response);
//         Swal.fire("¡Producto creado!", "", "success");
//       } catch (error) {
//         console.error("Error al crear el producto:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Ha ocurrido un error al crear el producto. Inténtalo nuevamente.",
//         });
//       } finally {
//         onOpenChange(); // Close the modal
//         setFormData({
//           uid: "",
//           nameProduct: "",
//           descriptionProduct: "",
//           imageProduct: "",
//           price: 0,
//         });
//       }
//     }
//   };
//   const handleCloseCancel = async () => {
//     const result = await Swal.fire({
//       title: "¿Estás seguro de cerrar sin crear el producto?",
//       text: "Se perderán los cambios no guardados.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Si",
//       confirmButtonColor: "var(--blue)",
//       cancelButtonText: "Cancelar",
//       cancelButtonColor: "#d33",
//       reverseButtons: true,
//     });

//     if (result.isConfirmed) {
//       onOpenChange();
//     }
//   };

//   const router = useRouter();
//   const handleCloseOpen = async () => {
//     onOpen();
//   };
//   return (
//     <>
//       <Button
//         color="primary"
//         endContent={<PlusIcon />}
//         onPress={handleCloseOpen}
//       >
//         CREAR PRODUCTO
//       </Button>

//       <Modal
//         backdrop="blur"
//         isOpen={isOpen}
//         onOpenChange={handleCloseCancel}
//         scrollBehavior="inside"
//         isDismissable={false}
//         isKeyboardDismissDisabled={true}
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Crear producto
//               </ModalHeader>
//               <ModalBody>
//                 <Input type="file" label=" " placeholder="" required />
//                 <Input type="file" label=" " placeholder="" required />
//                 <Input
//                   type="text"
//                   label="Nombre del producto"
//                   placeholder=""
//                   required
//                   value={formData.nameProduct}
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   type="text"
//                   label="Description del producto"
//                   placeholder=""
//                   required
//                   value={formData.descriptionProduct}
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   type="number"
//                   label="Precio del producto"
//                   placeholder="0.00"
//                   labelPlacement="inside"
//                   startContent={
//                     <div className="pointer-events-none flex items-center">
//                       <span className="text-default-400 text-small">$</span>
//                     </div>
//                   }
//                   // value={formData.price}
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   type="number"
//                   label="Descuento del producto"
//                   placeholder="0.00"
//                   labelPlacement="inside"
//                   startContent={
//                     <div className="pointer-events-none flex items-center">
//                       <span className="text-default-400 text-small">%</span>
//                     </div>
//                   }
//                   // value={formData.priceOff}
//                   onChange={handleInputChange}
//                 />
//                 <Input
//                   type="url"
//                   label="url del prodcuto 4life"
//                   placeholder="heroui.org"
//                   labelPlacement="inside"
//                   startContent={
//                     <div className="pointer-events-none flex items-center">
//                       <span className="text-default-400 text-small"></span>
//                     </div>
//                   }
//                   // value={formData.saving}
//                   onChange={handleInputChange}
//                 />
//               </ModalBody>
//               <ModalFooter>
//                 <Button
//                   color="danger"
//                   variant="light"
//                   onPress={handleCloseCancel}
//                 >
//                   Cancelar
//                 </Button>

//                 <Button color="primary" onPress={handleClose}>
//                   Crear producto
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
