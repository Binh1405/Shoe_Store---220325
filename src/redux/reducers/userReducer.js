import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: null,
  singleUser: {},
  allUsers: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
      console.log("get single user success", action.payload);
      state.singleUser = action.payload;
    },
    getAllUserSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.allUsers = action.payload;
    },
  },
});

export const getUser = (userId) => async (dispatch) => {
  console.log("currentUser", userId);
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.get(`/users/${userId}`);
    console.log("current user", res);
    dispatch(slice.actions.getUserSuccess(res.data.data));
    toast.success("Get user success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const res = await apiService.get("/users");
    console.log("all Users", res);
    dispatch(slice.actions.getAllUserSuccess(res.data.data.result));
    toast.success("Get all users success");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
