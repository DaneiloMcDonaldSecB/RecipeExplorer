import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { fetchRecipes } from "../api/recipeApi";
import { useThemeStyles } from "../styles/globalStyles";

const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const styles = useThemeStyles();

  useEffect(() => {
    const loadRecipes = async () => {
      const initialRecipes = await fetchRecipes();
      setRecipes(initialRecipes);
    };
    loadRecipes();
  }, []);

  const handleSearch = async () => {
    const results = await fetchRecipes(query);
    setRecipes(results);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Find Your Favorite Recipes</Text>

        <TextInput
          mode="outlined"
          label="Search for a recipe..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Search
        </Button>

        <FlatList
          data={recipes}
          keyExtractor={(item) => item.recipe.uri}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() =>
                navigation.navigate("RecipeDetailScreen", {
                  recipe: item.recipe,
                })
              }
            >
              <Image source={{ uri: item.recipe.image }} style={styles.image} />
              <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
