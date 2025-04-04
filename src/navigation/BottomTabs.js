import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
  </Stack.Navigator>
);

const BottomTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Home" 
      component={HomeStack} 
      options={{ tabBarIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Favorites" 
      component={FavoritesScreen} 
      options={{ tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen} 
      options={{ tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export default BottomTabs;
