import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./recipeSlice";
import themeReducer from "./themeSlice"; 

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    theme: themeReducer, 
  },
});
