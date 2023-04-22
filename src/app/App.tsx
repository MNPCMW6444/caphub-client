import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import { UserContextProvider } from "./context/UserContext";
import Home from "./components/Home";
import ProvideMainServer from "@caphub-funding/mainserver-provider";

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
