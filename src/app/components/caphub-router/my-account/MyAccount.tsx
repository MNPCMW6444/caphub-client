import { FC, useState, useEffect } from "react";
import { CapHubUser } from "@caphub-funding/caphub-types";

const MyAccount: FC = () => {
  const [user, setUser] = useState<CapHubUser | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData: CapHubUser = {
        email: "user@example.com",
        name: "John Doe",
        passwordHash: "hashed_password",
      };
      setUser(userData);
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h1>My Account</h1>
        <div>
          <label>Name:</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={user.email} readOnly />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value="********" readOnly />
        </div>
        {/* Add buttons or links to update account details, change password, etc. */}
      </div>
    </>
  );
};

export default MyAccount;
