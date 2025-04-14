// redux/themeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

// Thunk to load theme from Firestore
export const loadUserTheme = createAsyncThunk("theme/loadUserTheme", async (_, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    if (!user) return "light";

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() && docSnap.data().theme ? docSnap.data().theme : "light";
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Thunk to save theme to Firestore and update Redux
export const saveUserTheme = createAsyncThunk("theme/saveUserTheme", async (theme, { rejectWithValue }) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { theme }, { merge: true });
    return theme;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "light" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      })
      .addCase(saveUserTheme.fulfilled, (state, action) => {
        state.theme = action.payload;
      });
  },
});

export default themeSlice.reducer;
