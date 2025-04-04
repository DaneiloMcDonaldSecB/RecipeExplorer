import React from "react";
import { View, Text, Switch } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { useThemeStyles } from "../styles/globalStyles";

const SettingsScreen = () => {
  const styles = useThemeStyles();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000", fontSize: 18 }}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

export default SettingsScreen;
