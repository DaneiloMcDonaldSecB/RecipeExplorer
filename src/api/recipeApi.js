import { SPOONACULAR_API_KEY } from "@env";

const SEARCH_URL = "https://api.spoonacular.com/recipes/complexSearch";
const DETAIL_URL = "https://api.spoonacular.com/recipes";

export const fetchRecipes = async (query = "chicken") => {
  try {
    const searchResponse = await fetch(
      `${SEARCH_URL}?query=${query}&number=10&apiKey=${SPOONACULAR_API_KEY}`
    );
    const searchData = await searchResponse.json();
    const recipeIds = searchData.results.map((r) => r.id);

    const detailedFetches = await Promise.all(
      recipeIds.map((id) =>
        fetch(`${DETAIL_URL}/${id}/information?includeNutrition=false&apiKey=${SPOONACULAR_API_KEY}`)
          .then((res) => res.json())
      )
    );

    return detailedFetches;
  } catch (error) {
    console.error("Error fetching full recipe details:", error);
    return [];
  }
};
