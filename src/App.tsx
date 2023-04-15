import "./App.css";
import "./custom-styles.css";
import CapHubSurvey from "./components/CapHubSurvey";
import { founders } from "./content/surveys";

const App = () => {
  return <CapHubSurvey surveyJson={founders} type="founder" />;
};
export default App;
