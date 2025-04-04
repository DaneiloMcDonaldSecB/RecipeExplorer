import React from "react";
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const RecipeListScreen = ({ navigation }) => {
  const { data, loading, error } = useSelector((state) => state.recipes);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching recipes</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.recipe.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeCard}
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item.recipe })}
          >
            <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  recipeCard: { padding: 10, borderBottomWidth: 1, borderColor: "#ccc" },
  recipeTitle: { fontSize: 18, fontWeight: "bold" },
});

export default RecipeListScreen;
