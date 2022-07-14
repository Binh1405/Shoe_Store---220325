import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { current } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  singleProduct: {},
  cartProducts: [],
  error: "",
  loading: false,
  status: "",
};

export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async ({page, limit , query}) => {
    let url = `/products?page=${page}&limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await apiService.get(url);
    console.log("all Products", res);
    return res.data.data.result;
  }
);

export const getSingleProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (productId) => {
    const res = await apiService.get(`/products/${productId}`);
    console.log("singleProduct", res);
    return res.data.data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
