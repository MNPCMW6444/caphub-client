import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import { UserContextProvider } from "./context/UserContext";
import CapHubRouter from "./components/caphub-router/CapHubRouter";
import { ProvideMainServer } from "@caphub-group/mainserver-provider";

const App = () => (
  <CapHubThemeProvider>
    <ProvideMainServer>
      <UserContextProvider>
        <CapHubRouter />
      </UserContextProvider>
    </ProvideMainServer>
  </CapHubThemeProvider>
);

export default App;
