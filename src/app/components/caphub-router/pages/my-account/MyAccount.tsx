import { useState, useContext } from "react";
import axios from "axios";
import domain from "../../../util/config/domain";
import UserContext from "../../../context/UserContext";
import QRCode from "qrcode.react";  // ensure you've installed qrcode.react
import { Box, Button, TextField } from "@mui/material";

const MyAccount = () => {
  const { user } = useContext(UserContext);
  const [qrcode, setQrcode] = useState("");
  const [code, setCode] = useState("");

  if (!user) {
    return (
      <Box>
        <h2>Please login to view this page</h2>
      </Box>
    )
  }

  const handleSetup = () => {
    axios
      .post(domain + "2fa-setup")
      .then((response) => {
        setQrcode(response.data.qrcode);
      })
      .catch((error) => {
        console.error("Error during 2FA setup: ", error);
      });
  };

  const handleVerify = () => {
    axios
      .post(domain + "2fa-verify", { code })
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error during 2FA verification: ", error);
      });
  };

  return (
    <Box>
      <h2>Welcome, {user.name}</h2>
      {qrcode ? (
        <Box>
          <QRCode value={qrcode} />
          <TextField
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleVerify}>Verify 2FA Setup</Button>
        </Box>
      ) : (
        <Button onClick={handleSetup}>Setup 2FA</Button>
      )}
    </Box>
  );
};

export default MyAccount;