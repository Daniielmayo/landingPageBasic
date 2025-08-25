
import { Product } from "@/types/selectedProduct.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  selectedProduct: Product | null;
};

const persistedProduct = 
typeof window !== "undefined" ? localStorage.getItem("selectedProduct"):null;

const initialState: ProductState = {
  selectedProduct:persistedProduct ? JSON.parse(persistedProduct): null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    selectProduct(state, action: PayloadAction<Product>) {
      state.selectedProduct = action.payload;
      localStorage.setItem("selectedProduct", JSON.stringify(action.payload))
    },
    clearSelectedProduct(state) {
      state.selectedProduct = null;
      localStorage.removeItem("selectedProduct")
    },
  },
});

export const { selectProduct, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
