import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadThemePreference = async () => {
  const theme = await AsyncStorage.getItem("theme");
  return theme ? theme : "light"; 
};

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "light" }, 
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      AsyncStorage.setItem("theme", action.payload); 
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
