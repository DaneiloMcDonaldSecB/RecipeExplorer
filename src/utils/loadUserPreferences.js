import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { setTheme } from "../redux/themeSlice";

export const loadUserPreferences = async (user, dispatch) => {
  try {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { theme } = docSnap.data();
      if (theme) {
        dispatch(setTheme(theme));
      }
    }
  } catch (error) {
    console.error("Failed to load user preferences:", error.message);
  }
};
