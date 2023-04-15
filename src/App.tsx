import "./App.css";
import "./custom-styles.css";
import CapHubSurvey from "./components/CapHubSurvey";
import { founders } from "./content/surveys";
import { caphubTheme } from "./style/caphubTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

const App = () => {
  return (
    <ThemeProvider theme={caphubTheme}>
      <CapHubSurvey surveyJson={founders} type="founder" />
    </ThemeProvider>
  );
};
export default App;
