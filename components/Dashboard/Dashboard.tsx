"use client";
import { useAppDispatch } from "@/store/store";
import TableProducts from "./tableProducts/tableProducts";
import { useEffect } from "react";
import { getProducts } from "@/services/products/getProducts";
import { allProducts } from "@/store/slices/productsSlice";

import { useSession } from "next-auth/react";
import { userInfo } from "@/store/slices/userSlice";

export const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProductsDashboard = async () => {
      try {
        const productsTable = await getProducts();
        dispatch(allProducts(productsTable));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductsDashboard();
  }, [dispatch]);

  useEffect(() => {
    if (session?.user) {
      dispatch(userInfo(session.user));
    }
  }, [dispatch, session]);
  return (
    <div className="p-5">
      <TableProducts />
    </div>
  );
};
