import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/api/apiSlice";
import authReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
