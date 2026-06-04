import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const destroyReview = createAsyncThunk(
  "api/reviewDelete",
  async ({ id: id, reviewId: reviewId }, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(
        `https://airbnb-project-ex9c.onrender.com/api/listing/review/${id}/${reviewId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
