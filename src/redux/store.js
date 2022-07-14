import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productSliceReducer from "../redux/reducers/productReducer";
import cartSliceReducer from "../redux/reducers/cartReducer";

export const store = configureStore({
  reducer: combineReducers({
    product: productSliceReducer,
    cart: cartSliceReducer,
  }),
});
