import Axios from "axios";
import { createContext, useEffect, useState } from "react";
import domain from "../util/domain";

const UserContext = createContext<any>(undefined);

function UserContextProvider(props: any) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    try {
      const userRes = await Axios.get(domain + "user/signedin");
      setUser(userRes.data);
    } catch (e) {
      setUser(undefined);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
