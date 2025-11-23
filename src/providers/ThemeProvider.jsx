import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const isDarkMode = JSON.parse(localStorage.getItem("isDark"));
  // 👉 Theme values
  const skeletonTheme = isDarkMode
    ? { baseColor: "#2b2b2b", highlightColor: "#3d3d3d" }
    : { baseColor: "#e0e0e0", highlightColor: "#f5f5f5" };

  return (
    <ThemeContext.Provider value={{ skeletonTheme, isDarkMode }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
