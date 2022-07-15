import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  cartProducts: [],
  quantity: "",
  total: 0,
  error: "",
  loading: false,
  state: "",
};

export const getOwnCart = createAsyncThunk("cart/getOwnCart", async () => {
  const res = await apiService.get(`/carts/myCart`);
  console.log("res", res);
  toast.success("successfully get your cart")
  return res.data.data;
});

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (productId) => {
    const res = await apiService.post(`/carts/${productId}`);
    return res.data.data.result;
  }
);

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async ({ productId, qty, price }) => {
    const res = await apiService.put(`/carts/addProductCart/${productId}`, {
      productId,
      qty,
      price,
    });
    console.log("AddOrCreateProductToCart", res);
    return res.data.data.products;
  }
);

export const removeSingleProduct = createAsyncThunk(
  "cart/removeProductFromCart",
  async (productId, { dispatch }) => {
    const res = await apiService.delete(
      `/carts/subtractOneProduct/${productId}`,
      { data: { productId } }
    );
    toast.success("this product has been removed");
    dispatch(getOwnCart());
    return res.data.data.products;
  }
);

export const removeWholeProductFromCart = createAsyncThunk(
  "cart/removeWholeProductFromCart", 
  async(productId, {dispatch})=>{
    const res = await apiService.delete(
      `/carts/removeProductFromCart/${productId}`
    )
    console.log("deleted product from cart", res)
    toast.success("this product has been deleted")
    dispatch(getOwnCart())
    return res.data.data.products
  }
)

export const addOneProduct = createAsyncThunk(
  "cart/addOneProduct", async ({productId, qty}, {dispatch})=>{
    const res = await apiService.put(`/carts/addOneProduct/${productId}`, {productId, qty}
    )
    console.log("addOneProductToCart", res)
    toast.success("add one more successfully")
    dispatch(getOwnCart())
    return res.data.data.products[0]
  }
)
export const cartSlice = createSlice({
  name: "carts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOwnCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getOwnCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.cartProducts = action.payload.products;
        state.total = action.payload.totalPrice;
        state.quantity = state.cartProducts.length;
      })
      .addCase(getOwnCart.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(createCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        state.quantity += 1;
        state.cartProducts.push(action.payload);
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(removeSingleProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(removeSingleProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.loading = false;
        const { productId } = action.payload;
        state.cartProducts = state.cartProducts.filter((product) => {
          if (product.productId._id !== productId) return true;
          return false;
        });
      })
      .addCase(removeSingleProduct.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(removeWholeProductFromCart.pending, (state)=>{
      state.status = "loading";
      state.loading = true
    }).addCase(removeWholeProductFromCart.fulfilled, (state, action)=>{
      state.status = "idle";
      state.loading = false;
      const {productId} = action.payload
      state.cartProducts = state.cartProducts.filter((product)=>{
        if(product.productId._id !== productId) return true
        return false
      })
    }).addCase(removeWholeProductFromCart.rejected, (state, action) => {
      state.status = "error";
      state.loading = false
      state.error = action.error.message
    });
    builder
    .addCase(addOneProduct.pending, (state)=>{
      state.status = "loading";
      state.loading = true;
    })
    .addCase(addOneProduct.fulfilled, (state, action)=>{
      state.status = "idle";
      state.loading = false;
      const {productId} = action.payload;
      console.log("productId", productId)
      state.cartProducts = state.cartProducts.filter((product) => {
        if (product.productId._id == productId) return true;
        return false;
      });
  })
    .addCase(addOneProduct.rejected, (state, action)=>{
        state.status = "error";
        state.loading = false;
        state.error = action.error.message
      })
  },
});

export default cartSlice.reducer;
