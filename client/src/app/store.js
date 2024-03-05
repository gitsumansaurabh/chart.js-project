import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../components/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
