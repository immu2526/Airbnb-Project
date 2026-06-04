import { configureStore } from "@reduxjs/toolkit";

import listingReducer from "./listing-Slice/index";
import userReducer from "./user/auth";

export const store = configureStore({
  reducer: {
    listing: listingReducer,
    user: userReducer,
  },
});

export default store;
