import React, { useState } from "react";
import { View, Text, Switch, ActivityIndicator, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { saveUserTheme } from "../redux/themeSlice";
import { useThemeStyles } from "../styles/globalStyles";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const styles = useThemeStyles();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(saveUserTheme(newTheme));
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      Alert.alert("Logout Successful", "You’ve been signed out.");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/logo.png")}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          resizeMode: "contain",
          marginBottom: 10,
        }}
      />

      <Text style={styles.title}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcons
            name="brightness-6"
            size={24}
            color={theme === "dark" ? "#FFFFFF" : "#000000"}
          />
          <Text
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              fontSize: 18,
              marginLeft: 10,
            }}
          >
            Dark Mode
          </Text>
        </View>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      {/* Logout */}
      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialIcons name="logout" size={24} color="#FF3B30" />
        <Button
          mode="contained"
          onPress={handleLogout}
          disabled={loading}
          style={[styles.button, { flex: 1, marginLeft: 10 }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Logout</Text>
          )}
        </Button>
      </View>
    </View>
  );
};

export default SettingsScreen;
