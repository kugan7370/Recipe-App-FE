import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addFavoriteRecipe,
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from "../api/Recipe";

const initialState = {
  loading: false,
  favourite: [],
  error: null,
};

export const fetchFavorite = createAsyncThunk(
  "recipe/fetchFavorite",
  async (recipe, { rejectWithValue }) => {
    try {
      const results = await getFavoriteRecipes();
      return results.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const addFavRecipe = createAsyncThunk(
    "recipe/addFavRecipe",
    async (recipeId, { rejectWithValue }) => {
      try {
        const results = await addFavoriteRecipe(recipeId);
        return results.data; 
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );
  
  export const removeFavRecipe = createAsyncThunk(
    "recipe/removeFavRecipe",
    async (recipeId, { rejectWithValue }) => {
      try {
        const results = await removeFavoriteRecipe(recipeId);
        return results.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );
  
  const recipeslicer = createSlice({
    name: "recipe",
    initialState,
    reducers: {
      clearRecipe: (state) => {
        state.favourite = [];
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchFavorite.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchFavorite.fulfilled, (state, action) => {
          state.loading = false;
          state.favourite = action.payload;
        })
        .addCase(fetchFavorite.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(addFavRecipe.fulfilled, (state, action) => {
          state.favourite = action.payload;
          
        })
        .addCase(removeFavRecipe.fulfilled, (state, action) => {
          state.favourite = action.payload;
         
        });
    },
  });

export const { clearRecipe } = recipeslicer.actions;
  


export default recipeslicer.reducer;
