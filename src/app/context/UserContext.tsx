import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import domain from "../util/config/domain";
import { CaphubUser } from "@caphub-group/caphub-types";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import { Typography } from "@mui/material";

const UserContext = createContext<{
  user?: CaphubUser;
  getUser: () => Promise<void>;
}>({ getUser: () => Promise.resolve() });

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(undefined);
  const axiosInstance = useContext(MainServerContext);
  const loadingMessage = <Typography>Loading lilush...</Typography>;
  const [loading, setloading] = useState(true);

  const getUser = useCallback(async () => {
    axiosInstance
      .get(domain + "auth/signedin")
      .then((userRes) => {
        setloading(false);
        setUser(userRes.data);
      })
      .catch((e) => {
        setloading(false);

        setUser(undefined);
      });
  }, [axiosInstance]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {loading ? loadingMessage : children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
