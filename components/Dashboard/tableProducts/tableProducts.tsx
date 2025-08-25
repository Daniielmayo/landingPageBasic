"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  Avatar,
} from "@nextui-org/react";
import { PlusIcon } from "../../icons/Dashboard/PlusIcon";
import { VerticalDotsIcon } from "../../icons/Dashboard/VerticalDotsIcon";
import { SearchIcon } from "../../icons/Dashboard/SearchIcon";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import { deleteProduct } from "@/services/products/deleteProduct";
import { getProducts } from "@/services/products/getProducts";
import { allProducts } from "@/store/slices/productsSlice";
import { selectProduct } from "@/store/slices/selectedProductSlice";

const INITIAL_VISIBLE_COLUMNS = [
  "imageProduct",
  "nameProduct",
  "descriptionProduct",
  "actions",
];

const statusColorMap: Record<string, string> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export interface ProductSelected {
  _id: string;
  nameProduct: string;
  descriptionProduct: string;
  imageProduct: string;
  price: number;
  priceOff: number | null;
  saving: number | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  link4lifeProduct:string;
}

export default function TableProducts() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.userInfo);
  const uid = user?.uid;

  const router = useRouter();
  const productsAll = useAppSelector((state) => state.products.allProducts);

  const [filterValue, setFilterValue] = React.useState("");

  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    const customColumns = [
      { name: "IMAGES", uid: "imageProduct", sortable: true },
      { name: "NOMBRE DEL PRODUCTO", uid: "nameProduct", sortable: true },
      { name: "DESCRIPCIÓN", uid: "descriptionProduct", sortable: true },
      { name: "ACCIONES", uid: "actions" },
    ];

    return customColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    if (!productsAll) {
      return [];
    }

    let filteredProducts = [...productsAll];
    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.nameProduct
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          product.descriptionProduct
            .toLowerCase()
            .includes(filterValue.toLowerCase())
      );
    }

    return filteredProducts;
  }, [productsAll, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const handleDelete = async (productId: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const uid = user?.uid || "";
      const responseDeleteProduct = await deleteProduct(uid, productId);

      if (!responseDeleteProduct) {
        return Swal.fire({
          title: "Producto no eliminado!",
          text: "Se generó un error al eliminar el producto.",
          icon: "error",
        });
      }
      const fetchProductsDashboard = async () => {
        try {
          const productsTable = await getProducts();
          dispatch(allProducts(productsTable));
        } catch (error) {
          console.error(error);
        }
      };
      fetchProductsDashboard();
      // router.refresh();
      Swal.fire({
        title: "Eliminado!",
        text: "Su producto ha sido borrado.",
        icon: "success",
      });
    }
  };

  const updateProduct = (product: ProductSelected) => {
    console.log(product);
    dispatch(selectProduct(product));
    router.push(`/dashboard/updateProduct`);
  };

  const renderCell = React.useCallback(
    (product: any, columnKey: string | number) => {
      const cellValue = product[columnKey];

      switch (columnKey) {
        case "imageProduct":
          return <Avatar isBordered radius="md" src={cellValue} />;
        case "nameProduct":
          return <span>{cellValue}</span>;
        case "descriptionProduct":
          return <span>{cellValue}</span>;
        case "actions":

        
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <VerticalDotsIcon className="text-default-300" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => updateProduct(product)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDelete(product._id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <span>{cellValue}</span>;
      }
    },
    []
  );

  const handleOpenModal = () => {
    router.push(`/dashboard/${uid}/create-product`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-[60%] md:w-[80%]">
          <Input
            isClearable
            className="w-full md:w-[100%] lg:w-[40%]"
            color="primary"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
        </div>
        <Button
          color="primary"
          endContent={<PlusIcon />}
          onPress={handleOpenModal}
        >
          CREAR PRODUCTO
        </Button>
        {/* <Link href={"/dashboard/falsfjasj/create-product"}></Link> */}
        {/* <Button onClick={handleOpenModal}>Create Product</Button> */}
        {/* ... your pagination and controls */}
        {/* <CreateProducts /> */}
      </div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-default-400 text-small text-[var(--darkGray)]">
          Total {productsAll?.length} products
        </span>
        <span className="text-default-400 text-small"></span>
        <label className="flex items-center text-[var(--darkGray)] text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-[var(--darkGray)] text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">20</option>
          </select>
        </label>
      </div>
      <Table>
        <TableHeader>
          {headerColumns.map((column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {items.map((product) => (
            <TableRow key={product._id}>
              {Array.from(visibleColumns).map((columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(product, columnKey)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center gap-2 mt-4">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-start gap-2 ">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
