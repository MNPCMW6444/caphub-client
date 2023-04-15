import { founders } from "../content/surveys";
import CapHubSurvey from "./components/CapHubSurvey";
import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import ProvideMainServer from "./providers/servers/ProvideMainServer";

const App = () => {
  return (
    <CapHubThemeProvider>
      <ProvideMainServer>
        <CapHubSurvey surveyJson={founders} type="founder" />
      </ProvideMainServer>
    </CapHubThemeProvider>
  );
};
export default App;
