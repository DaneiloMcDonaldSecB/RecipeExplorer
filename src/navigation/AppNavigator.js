import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

// Screens
import HomeScreen from "../screens/HomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AuthScreen from "../screens/AuthScreen";

// Firebase & Helpers
import { auth } from "../../config/firebaseConfig";
import { loadUserTheme } from "../redux/themeSlice";
import { syncFavoritesFromFirestore } from "../redux/recipeSlice";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
    <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AuthScreen" component={AuthScreen} />
  </Stack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Favorites"
      component={FavoritesStack}
      options={{
        tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // ✅ Load theme and favorites from Firestore after authentication
        await dispatch(loadUserTheme());
        await dispatch(syncFavoritesFromFirestore());
      }

      setUser(currentUser);
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) return null; // Optional: Show splash screen here

  return (
    <NavigationContainer>
      {user ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
