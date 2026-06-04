import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const destroyReview = createAsyncThunk(
  "api/reviewDelete",
  async ({ id: id, reviewId: reviewId }, { rejectWithValue }) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:5000/api/listing/review/${id}/${reviewId}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
