import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "@/types/products.type";

interface ProductsState {
  allProducts: Products[] | null;
}

const persistedProducts =
  typeof window !== "undefined" ? localStorage.getItem("allProducts") : null;

const initialState: ProductsState = {
  allProducts: persistedProducts ? JSON.parse(persistedProducts) : null,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {
    allProducts(state, action: PayloadAction<Products[]>) {
      state.allProducts = action.payload;
      localStorage.setItem("allProducts", JSON.stringify(action.payload));
    },

    clearSelectedProducts(state) {
      state.allProducts = null;
      localStorage.removeItem("allProducts");
    },
  },
});

export const { allProducts, clearSelectedProducts } = allProductsSlice.actions;
export default allProductsSlice.reducer;
