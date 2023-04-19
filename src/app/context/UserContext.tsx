import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import domain from "../util/config/domain";
import { MainServerContext } from "@caphub-funding/mainserver-provider";
import { CapHubUser } from "@caphub-funding/caphub-types";

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
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
