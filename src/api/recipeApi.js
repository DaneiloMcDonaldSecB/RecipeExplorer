import { EDAMAM_APP_ID, EDAMAM_APP_KEY } from "@env";

const API_URL = "https://api.edamam.com/api/recipes/v2";

export const fetchRecipes = async (query = "chicken") => {
  try {
    const response = await fetch(
      `${API_URL}?type=public&q=${query}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`
    );
    const data = await response.json();
    return data.hits.slice(0, 10); 
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
