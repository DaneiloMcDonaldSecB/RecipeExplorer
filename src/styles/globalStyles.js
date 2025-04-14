// globalStyles.js
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const useThemeStyles = (forcedTheme = null) => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const theme = forcedTheme || currentTheme;
  const isDark = theme === "dark";

  return StyleSheet.create({
    // Safe area wrapper
    safeArea: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#FAFAFA",
    },

    // General container
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
      backgroundColor: isDark ? "#181818" : "#FFFFFF",
    },

    // Screen titles
    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: isDark ? "#FFFFFF" : "#333333",
    },

    // Input fields (search, forms)
    input: {
      marginBottom: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 8,
      backgroundColor: isDark ? "#333333" : "#FFFFFF",
      borderColor: isDark ? "#555555" : "#DDDDDD",
      borderWidth: 1,
      color: isDark ? "#FFFFFF" : "#000000",
    },

    // Buttons (general buttons)
    button: {
      marginBottom: 15,
      backgroundColor: "#FF5722",
      borderRadius: 8,
      paddingVertical: 12,
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },

    // Recipe card styling (used in lists)
    recipeCard: {
      flexDirection: "row",
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
      backgroundColor: isDark ? "#252525" : "#FFFFFF",
      elevation: 3, // Android
      shadowColor: "#000", // iOS
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      alignItems: "center",
    },

    recipeTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 10,
      color: isDark ? "#FFFFFF" : "#000000",
    },

    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
    },

    // Recipe detail page container
    // Recipe detail page container
    detailContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? "#181818" : "#FFFFFF",
    },

    detailImage: {
      width: "100%",
      height: 250,
      borderRadius: 10,
      marginBottom: 10,
    },

    detailTitle: {
      fontSize: 26,
      fontWeight: "bold",
      marginBottom: 10,
      color: isDark ? "#FFFFFF" : "#000000",
    },

    subtitle: {
      fontSize: 18,
      textAlign: "center",
      fontWeight: "bold",
      color: isDark ? "#AAAAAA" : "#666666",
      marginTop: 20,
      marginBottom: 10,
    },

    ingredient: {
      fontSize: 16,
      marginBottom: 5,
      color: isDark ? "#DDDDDD" : "#000000",
    },

    // Bullet list format (for ingredients or alternative display)
    bulletPoint: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    
    bulletDot: {
      fontSize: 16,
      width: 20,
      textAlign: "center",
      color: isDark ? "#FF9800" : "#FF5722",
      marginTop: 2,
    },
    
    bulletText: {
      flex: 1,
      fontSize: 16,
      lineHeight: 22,
      color: isDark ? "#DDDDDD" : "#000000",
    },
    
    instructionRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 10,
    },
    
    instructionNumber: {
      width: 30, // enough space for up to 3 digits
      fontWeight: "bold",
      textAlign: "right",
      marginRight: 8,
      marginTop: 2,
      color: isDark ? "#FFAB40" : "#FF5722",
    },
    
    instructionText: {
      flex: 1,
      fontSize: 16,
      lineHeight: 22,
      color: isDark ? "#DDDDDD" : "#000000",
    },
    
  });
};
