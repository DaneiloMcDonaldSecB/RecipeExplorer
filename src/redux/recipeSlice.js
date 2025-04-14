import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecipes } from "../api/recipeApi";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { auth } from "../../config/firebaseConfig";

// Fetch recipes
export const getRecipes = createAsyncThunk("recipes/getRecipes", async (query, { rejectWithValue }) => {
  try {
    const results = await fetchRecipes(query);
    if (!Array.isArray(results)) throw new Error("Invalid API response");
    return results;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Load from Firestore
export const syncFavoritesFromFirestore = createAsyncThunk("recipes/syncFavoritesFromFirestore", async () => {
  const db = getFirestore();
  const user = auth.currentUser;
  if (!user) return [];
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().favorites || [] : [];
});

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    data: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(r => r.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        updateFavoritesInFirestore(state.favorites);
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(r => r.id !== action.payload.id);
      updateFavoritesInFirestore(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecipes.pending, (state) => { state.loading = true; })
      .addCase(getRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncFavoritesFromFirestore.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;

// 🔥 Firestore writer
const updateFavoritesInFirestore = async (favorites) => {
  const db = getFirestore();
  const user = auth.currentUser;
  if (!user) return;
  await setDoc(doc(db, "users", user.uid), { favorites });
};
