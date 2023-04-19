import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import ProvideMainServer from "@caphub-funding/mainserver-provider";
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
