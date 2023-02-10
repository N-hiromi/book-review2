import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slice/authSlice";
import { pageSlice } from "./slice/pageSlice";
import { loadingSlice } from "./slice/loadingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    page: pageSlice.reducer,
    loading: loadingSlice.reducer
  },
});
