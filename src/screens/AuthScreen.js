// screens/AuthScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { useThemeStyles } from "../styles/globalStyles";

const AuthScreen = ({ navigation }) => {
  const styles = useThemeStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      Alert.alert("Authentication Error", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            marginBottom: 10,
          }}
          resizeMode="contain"
        />

        <Text style={styles.title}>Recipe Explorer</Text>
        <Text style={[styles.subtitle, { marginBottom: 30 }]}>
          {isLogin ? "Login" : "Register"}
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleAuth}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Button>

        <Button
          mode="text"
          onPress={() => setIsLogin(!isLogin)}
          labelStyle={{ color: "#FF5722" }}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;
