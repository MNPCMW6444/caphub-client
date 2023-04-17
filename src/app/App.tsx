import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import ProvideMainServer from "./providers/servers/ProvideMainServer";
import { UserContextProvider } from "./context/UserContext";
import Home from "./components/Home";

const App = () => (
  <CapHubThemeProvider>
    <ProvideMainServer>
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </ProvideMainServer>
  </CapHubThemeProvider>
);

export default App;
