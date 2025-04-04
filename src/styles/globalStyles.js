import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const useThemeStyles = () => {
  const theme = useSelector((state) => state.theme.theme);

  return StyleSheet.create({
    // Safe area wrapper
    safeArea: { 
      flex: 1, 
      backgroundColor: theme === "dark" ? "#121212" : "#FAFAFA",
    },

    // General container
    container: { 
      flex: 1, 
      padding: 20, 
      justifyContent: "center",
      backgroundColor: theme === "dark" ? "#181818" : "#FFFFFF"
    },

    // Screen titles
    title: { 
      fontSize: 28, 
      fontWeight: "bold", 
      textAlign: "center", 
      marginBottom: 20, 
      color: theme === "dark" ? "#FFFFFF" : "#333333"
    },

    // Input fields (search, forms)
    input: { 
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: theme === "dark" ? "#333333" : "#FFFFFF",
      borderColor: theme === "dark" ? "#555555" : "#DDDDDD",
      borderWidth: 1,
      color: theme === "dark" ? "#FFFFFF" : "#000000"
    },

    // Buttons (general buttons)
    button: { 
      marginBottom: 15,
      backgroundColor: "#FF5722", 
      borderRadius: 8,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center"
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    },

    // Recipe card styling (used in lists)
    recipeCard: { 
      flexDirection: "row", 
      padding: 15, 
      borderRadius: 12,
      marginBottom: 10,
      backgroundColor: theme === "dark" ? "#252525" : "#FFFFFF",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      alignItems: "center" 
    },

    recipeTitle: { 
      fontSize: 18, 
      fontWeight: "bold", 
      marginLeft: 10, 
      color: theme === "dark" ? "#FFFFFF" : "#000000"
    },

    image: { 
      width: 70, 
      height: 70, 
      borderRadius: 10 
    },

    // Recipe detail page container
    detailContainer: { 
      flex: 1, 
      padding: 20, 
      backgroundColor: theme === "dark" ? "#181818" : "#FFFFFF"
    },

    detailImage: { 
      width: "100%", 
      height: 250, 
      borderRadius: 10, 
      marginBottom: 10 
    },

    detailTitle: { 
      fontSize: 26, 
      fontWeight: "bold", 
      marginBottom: 10, 
      color: theme === "dark" ? "#FFFFFF" : "#000000"
    },

    subtitle: { 
      fontSize: 18, 
      fontWeight: "bold", 
      marginTop: 10, 
      color: theme === "dark" ? "#AAAAAA" : "#444444"
    },

    ingredient: { 
      fontSize: 16, 
      marginBottom: 5, 
      color: theme === "dark" ? "#DDDDDD" : "#000000"
    }
  });
};
