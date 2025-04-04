import React from "react";
import { View, Text, Image, ScrollView, Button, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/recipeSlice";
import { useThemeStyles } from "../styles/globalStyles"; 

const RecipeDetailScreen = ({ route, navigation }) => {
  // Ensure `recipe` exists
  if (!route.params || !route.params.recipe) {
    return (
      <SafeAreaView>
        <Text>Error: Recipe not found!</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const { recipe } = route.params;
  const styles = useThemeStyles();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  const isFavorite = favorites.some((fav) => fav.uri === recipe.uri);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.detailContainer}>
        <Image source={{ uri: recipe.image }} style={styles.detailImage} />
        <Text style={styles.detailTitle}>{recipe.label}</Text>

        <Button 
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} 
          onPress={() => isFavorite ? dispatch(removeFromFavorites(recipe)) : dispatch(addToFavorites(recipe))}
        />

        <Text style={styles.subtitle}>Ingredients:</Text>
        {recipe.ingredients?.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient.text}
          </Text>
        ))}

        <Button 
          title="View Full Recipe" 
          onPress={() => Linking.openURL(recipe.url)}
        />

        <Button 
          title="Go Back" 
          onPress={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;
