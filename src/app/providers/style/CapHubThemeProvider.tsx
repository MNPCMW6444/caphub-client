import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { caphubTheme } from "../../../style/caphubTheme";

interface CapHubThemeProviderProps {
  children: ReactNode;
}

const CapHubThemeProvider: React.FC<CapHubThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={caphubTheme}>{children}</ThemeProvider>;
};

export default CapHubThemeProvider;
