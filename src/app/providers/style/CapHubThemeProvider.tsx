import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { capHubTheme } from "../../../content/style/capHubTheme";

interface CapHubThemeProviderProps {
  children: ReactNode;
}

const CapHubThemeProvider: React.FC<CapHubThemeProviderProps> = ({
  children,
}) => {
  return <ThemeProvider theme={capHubTheme}>{children}</ThemeProvider>;
};

export default CapHubThemeProvider;
