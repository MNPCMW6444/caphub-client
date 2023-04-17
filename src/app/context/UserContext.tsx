import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import domain from "../util/config/domain";
import { MainServerContext } from "./MainServerContext";
import { CapHubUser } from "../types";

const UserContext = createContext<{
  user?: CapHubUser;
  getUser: () => Promise<void>;
}>({ getUser: () => Promise.resolve() });

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(undefined);
  const axiosInstance = useContext(MainServerContext);

  const getUser = useCallback(async () => {
    try {
      const userRes = await axiosInstance.get(domain + "auth/signedin");
      setUser(userRes.data);
    } catch (e) {
      setUser(undefined);
    }
  }, [axiosInstance]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      <LinkedInAuthHandler />
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };

const LinkedInAuthHandler = () => {
  const axiosInstance = useContext(MainServerContext);
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    const handleLinkedInCallback = async () => {
      // Parse the authorization code from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      if (authorizationCode) {
        try {
          // Send the authorization code to your server-side API
          await axiosInstance.post(domain + "auth/linkedin/callback", {
            code: authorizationCode,
          });

          // The JWT token should be set in the HttpOnly cookie at this point

          // Update the user state to reflect the authentication state
          await getUser();
        } catch (error) {
          console.error("Error handling LinkedIn callback:", error);
        }
      }
    };

    handleLinkedInCallback();
  }, [axiosInstance, getUser]);

  return null;
};
