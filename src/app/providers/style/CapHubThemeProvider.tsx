import { FC, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import caphubTheme from "../../../content/style/caphubTheme";

interface CaphubThemeProviderProps {
  children: ReactNode;
}

const CaphubThemeProvider: FC<CaphubThemeProviderProps> = ({ children }) => {
  return <ThemeProvider theme={caphubTheme}>{children}</ThemeProvider>;
};

export default CaphubThemeProvider;
