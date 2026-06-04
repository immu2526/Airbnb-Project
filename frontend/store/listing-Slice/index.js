import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { destroyReview } from "./review";

// call Backend API

export const index = createAsyncThunk(
  "api/listing",
  async (_, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        "https://airbnb-project-ex9c.onrender.com/api/listing"
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// indivisula listing call

export const listingDetails = createAsyncThunk(
  "/listing/:id",
  async (id, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(
        `https://airbnb-project-ex9c.onrender.com/api/listing/${id}`
      );
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

//create listing

export const createListing = createAsyncThunk(
  "/listing/new",
  async (formData, { rejectWithValue }) => {
    try {
      let mongo = await axios.post(
        "https://airbnb-project-ex9c.onrender.com/api/listing/new",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(mongo);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// update listing

export const updateListing = createAsyncThunk(
  "/listing/update",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      let mongo = await axios.put(
        `https://airbnb-project-ex9c.onrender.com/api/listing/${id}/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log(mongo);
      return mongo;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// delete Listing

export const deleteListing = createAsyncThunk(
  "/listing/delete",
  async (id, { rejectWithValue }) => {
    try {
      let mongo = await axios.delete(
        `https://airbnb-project-ex9c.onrender.com/api/listing/${id}`,
        {
          withCredentials: true,
        }
      );
      return mongo.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// initialization

const initialState = {
  isLoading: true,
  data: null,
  singleListing: null,
};

const leadSlice = createSlice({
  name: "listing",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(index.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(index.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(index.rejected, (state, action) => {
        (state.isLoading = false), (state.data = []);
      })
      //
      .addCase(listingDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listingDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleListing = action.payload.data;
      })
      .addCase(listingDetails.rejected, (state, action) => {
        state.isLoading = false;
      })
      //
      .addCase(deleteListing.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.isLoading = false;
        let id = action.payload.data;
        state.data = state.data.filter((val) => val._id !== id);
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(destroyReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(destroyReview.fulfilled, (state, action) => {
        state.isLoading = false;
        let id = action.payload.data;
        state.singleListing.reviews = state.singleListing.reviews.filter(
          (val) => val._id !== id
        );
      })
      .addCase(destroyReview.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default leadSlice.reducer;
