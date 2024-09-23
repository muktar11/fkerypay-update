import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

// Colors
export const COLORS = {
  primary: "#24C16B",     // Green
  secondary: "#0C381F",   // Dark Green
  black: "#1E1F20",
  white: "#FFFFFF",
  lightGray: "#F5F5F6",
  gray: "#BEC1D2",
  blue: "#42B0FF",
  yellow: "#FFD700",
};

// Font Sizes
export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: 50, lineHeight: 55 },
  h1: { fontFamily: "Roboto-Black", fontSize: 30, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: 22, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: 20, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: 18, lineHeight: 22 },
  body1: { fontFamily: "Roboto-Regular", fontSize: 30, lineHeight: 36 },
  body2: { fontFamily: "Roboto-Regular", fontSize: 22, lineHeight: 30 },
  body3: { fontFamily: "Roboto-Regular", fontSize: 16, lineHeight: 22 },
  body4: { fontFamily: "Roboto-Regular", fontSize: 14, lineHeight: 22 },
  body5: { fontFamily: "Roboto-Regular", fontSize: 12, lineHeight: 18 },
};

// SIZES
export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // App dimensions
  width,
  height,
};

// Images (ensure you have these image files in your assets)
export const images = {
  cover: require("../assets/adaptive-icon.png"),
  profile: require("../assets/icon.png"),
  icon: require("../assets/splash.png"),
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
