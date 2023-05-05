import CaphubThemeProvider from "./providers/style/CaphubThemeProvider";
import { UserContextProvider } from "./context/UserContext";
import CaphubRouter from "./components/caphub-router/CaphubRouter";
import { ProvideMainServer } from "@caphub-group/mainserver-provider";

const App = () => (
  <CaphubThemeProvider>
    <ProvideMainServer>
      <UserContextProvider>
        <CaphubRouter />
      </UserContextProvider>
    </ProvideMainServer>
  </CaphubThemeProvider>
);

export default App;
