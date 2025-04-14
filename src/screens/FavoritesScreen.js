import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeStyles } from "../styles/globalStyles";

const FavoritesScreen = ({ navigation }) => {
  const styles = useThemeStyles();
  const favoriteRecipes = useSelector((state) => state.recipes.favorites || []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Recipes</Text>

        {favoriteRecipes.length === 0 ? (
          <Text style={styles.subtitle}>No favorite recipes yet!</Text>
        ) : (
          <FlatList
            data={favoriteRecipes}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.recipeCard}
                onPress={() =>
                  navigation.navigate("RecipeDetailScreen", { recipe: item })
                }
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ flex: 1, paddingLeft: 10 }}>
                  <Text style={styles.recipeTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
