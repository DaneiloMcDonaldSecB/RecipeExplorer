import React from "react";
import { View, Text, Image, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../redux/recipeSlice";
import { useThemeStyles } from "../styles/globalStyles";

const RecipeDetailScreen = ({ route, navigation }) => {
  if (!route.params || !route.params.recipe) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: Recipe not found!</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const { recipe } = route.params;
  const styles = useThemeStyles();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  const isFavorite = favorites.some((fav) => fav.id === recipe.id);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={[styles.title, { marginBottom: 15 }]}>Recipe Details</Text>

        <Image source={{ uri: recipe.image }} style={styles.detailImage} />
        <Text style={[styles.detailTitle, { marginBottom: 10 }]}>{recipe.title}</Text>

        <Button
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          onPress={() =>
            isFavorite
              ? dispatch(removeFromFavorites(recipe))
              : dispatch(addToFavorites(recipe))
          }
        />

        {/* INGREDIENTS */}
        {recipe.extendedIngredients?.length > 0 && (
          <View style={{ marginTop: 25 }}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>🧂 Ingredients</Text>
            <View>
              {[...new Set(recipe.extendedIngredients.map((ing) => ing.original.trim()))]
                .filter(Boolean)
                .map((text, index) => (
                  <View key={index} style={styles.bulletPoint}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{text}</Text>
                  </View>
                ))}
            </View>
          </View>
        )}

        {/* INSTRUCTIONS */}
        {recipe.analyzedInstructions?.[0]?.steps?.length > 0 && (
          <View style={{ marginTop: 25 }}>
            <Text style={[styles.subtitle, { marginBottom: 10 }]}>👨‍🍳 Instructions</Text>
            {recipe.analyzedInstructions[0].steps.map((step, index) => (
              <View key={index} style={styles.instructionRow}>
                <Text style={styles.instructionNumber}>{index + 1}.</Text>
                <Text style={styles.instructionText}>{step.step}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ marginTop: 30 }}>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeDetailScreen;
