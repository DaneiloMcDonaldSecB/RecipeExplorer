import React, { useState } from "react";
import { View, Text, Switch, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/themeSlice";
import { useThemeStyles } from "../styles/globalStyles";
import { Button } from "react-native-paper";
import { signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const SettingsScreen = () => {
  const styles = useThemeStyles();
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), { theme: newTheme }, { merge: true });
      } catch (error) {
        console.error("Error saving theme:", error);
      }
    }
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
      <Text style={styles.title}>Settings</Text>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ color: theme === "dark" ? "#FFFFFF" : "#000000", fontSize: 18 }}>Dark Mode</Text>
        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
      </View>

      <View style={{ marginTop: 40 }}>
        <Button mode="contained" onPress={handleLogout} disabled={loading} style={styles.button}>
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
