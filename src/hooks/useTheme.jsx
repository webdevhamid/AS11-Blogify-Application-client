import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";

const useTheme = () => {
  const theme = useContext(ThemeContext);
  return theme;
};

export default useTheme;
