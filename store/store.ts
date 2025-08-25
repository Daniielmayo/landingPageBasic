import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import selectedProductSlice from "./slices/selectedProductSlice";

const rootReducer = {
  products: productsSlice,
  user: userSlice,
  productSelect: selectedProductSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
