import { founders } from "../content/surveys";
import CapHubSurvey from "./components/CapHubSurvey";
import CapHubThemeProvider from "./providers/style/CapHubThemeProvider";
import ProvideMainServer from "./providers/servers/ProvideMainServer";
// import { LinkedIn } from "react-linkedin-login-oauth2";
/* 
const handleLinkedInSuccess = async ( response: any ) => {
  try {
      const data = {
      code: response.code,
      redirectUri: "<Your LinkedIn Redirect URI>",
    }; 
    
    const res = await fetch("/api/auth/linkedin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
 
     const result = await res.json();
    // Handle the received data (e.g., store the user data, set the authenticated state, etc.)
  } catch (error) {
    console.log("Error exchanging LinkedIn code for access token:", error);
  }
}; */

/* const handleLinkedInFailure = (error: any) => {
  console.log("LinkedIn failure:", error);
}; */

const App = () => {
  return (
    <CapHubThemeProvider>
      <ProvideMainServer>
        <CapHubSurvey surveyJson={founders} type="founder" />
        <div>
          <h1>Login</h1>
          {/*  <LinkedIn
            clientId="<Your LinkedIn Client ID>"
            onSuccess={handleLinkedInSuccess}
            redirectUri="<Your LinkedIn Redirect URI>"
            children={function ({}:  linkedInLogin, 
            {
              linkedInLogin: any;
            }): JSX.Element {
              return <> console.log(3234)</>;
            }}
          /> */}
        </div>
      </ProvideMainServer>
    </CapHubThemeProvider>
  );
};
export default App;
