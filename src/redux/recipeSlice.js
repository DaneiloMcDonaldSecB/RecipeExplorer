import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes } from "../api/recipeApi";

export const getRecipes = createAsyncThunk("recipes/getRecipes", async (query, { rejectWithValue }) => {
  try {
    const response = await fetchRecipes(query);
    if (!response || !response.hits) throw new Error("Invalid API response");
    return response.hits.map((hit) => hit.recipe);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState: { data: [], favorites: [], loading: false, error: null },
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.favorites.some(recipe => recipe.uri === action.payload.uri)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(recipe => recipe.uri !== action.payload.uri);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => { state.loading = true; })
      .addCase(getRecipes.fulfilled, (state, action) => { state.loading = false; state.data = action.payload; })
      .addCase(getRecipes.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { addToFavorites, removeFromFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;
