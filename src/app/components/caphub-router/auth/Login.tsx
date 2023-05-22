import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import domain from "../../../util/config/domain";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import UserContext from "../../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export interface LablesConstants {
  IDLE: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
  DOING: {
    LOGIN: string;
    REGISTER: string;
    RESET: string;
  };
}

export const LABELS: LablesConstants = {
  IDLE: { LOGIN: "Login", REGISTER: "Register", RESET: "Reset" },
  DOING: {
    LOGIN: "Logging in...",
    REGISTER: "Registering...",
    RESET: "Resetting...",
  },
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LablesConstants>("IDLE");
  const { getUser } = useContext(UserContext);

  const navigate = useNavigate();

  const axiosInstance = useContext(MainServerContext);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateEmail(email) && password) {
      axiosInstance
        .post(domain + "auth/signin", { email, password })
        .then(() => getUser())
        .catch((error) => {
          setButtonLabel("IDLE");
          toast.error(
            error?.response?.data.clientError ||
              error?.message ||
              "Unknown error, Make sure you are Online"
          );
        });
      setButtonLabel("DOING");
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
      const redirectUri = encodeURIComponent(
        `${domain}auth/linkedin/callback${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_LINKEDIN_CLIENT_SECRET
            : ""
        }`
      );
      const scope = encodeURIComponent("r_emailaddress r_liteprofile");
      const responseType = "code";

      const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&redirect_uri=${redirectUri}&scope=${scope}&client_id=${clientId}`;

      window.location.href = linkedinAuthUrl;
    } catch (error) {
      console.error("Error initiating LinkedIn login:", error);
    }
  };

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <ToastContainer />
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            data-testid="email"
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            error={!validateEmail(email)}
            helperText={!validateEmail(email) ? "Invalid email" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="dense"
            data-testid="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Box mt={2}>
            <Button
              type="submit"
              data-testid="login-button"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              {LABELS[buttonLabel].LOGIN}
            </Button>
          </Box>
          <Box mt={2}>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleLinkedInLogin}
            >
              Login with LinkedIn
            </Button>
          </Box>
          <Box mt={1}>
            <Typography align="center">
              Don't have an account?
              <Button color="primary" onClick={() => navigate("/register")}>
                Register here
              </Button>
            </Typography>
            <Typography align="center">
              Forgot you password?
              <Button color="primary" onClick={() => navigate("/reset")}>
                Reset here
              </Button>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;
