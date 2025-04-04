import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { useThemeStyles } from "../styles/globalStyles"; // Import correctly

const FavoritesScreen = ({ navigation }) => {
  const styles = useThemeStyles(); // Ensure styles are retrieved properly
  const favoriteRecipes = useSelector((state) => state.recipes.favorites || []);

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Recipes</Text>

        {favoriteRecipes.length === 0 ? (
          <Text style={styles.subtitle}>No favorite recipes yet!</Text>
        ) : (
          <FlatList
            data={favoriteRecipes}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.recipeTitle}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default FavoritesScreen;
