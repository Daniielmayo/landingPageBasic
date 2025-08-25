"use client";
import React, { useState, useEffect, Suspense } from "react";
import styles from "./Products.module.css";
import { SearchInput } from "../Navbar/Search";
import { useAppDispatch } from "@/store/store";
import { CardProduct } from "../Card/Card";
import { Products } from "@/types/products.type";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts } from "@/services/products/getProducts";
import { allProducts } from "@/store/slices/productsSlice";

export const ProductsCards = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        dispatch(allProducts(productsData));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleSearch = (term: string) => {
    if (!products) {
      return;
    }
    if (term.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.nameProduct.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className={styles["products__container"]}>
      <div className={styles["products__content"]}>
        <h2 className={styles["products__title"]}>Productos</h2>
        <AnimatePresence>
          <SearchInput onSearch={handleSearch} />
          {filteredProducts.length === 0 ? (
            <Suspense>
              <p
                style={{
                  fontSize: "var(--fontSize-titles_mobile)",
                  height: "80vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No se encontraron productos
              </p>
            </Suspense>
          ) : (
            <Suspense>
              <div className={styles["products__content-items"]}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    key={index}
                  >
                    <CardProduct
                      src={product.imageProduct}
                      title={product.nameProduct}
                      price={product.price}
                      description={product.descriptionProduct}
                      link4lifeProduct={product.link4lifeProduct}
                    />
                  </motion.div>
                ))}
              </div>
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
