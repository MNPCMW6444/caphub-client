import { ChangeEvent, FC, FormEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import zxcvbn from "zxcvbn";
import styled from "@emotion/styled";
import domain from "../../util/config/domain";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import UserContext from "../../context/UserContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CaphubAuthProps {}

interface LablesConstants {
  IDLE: {
    LOGIN: string;
    REGISTER: string;
  };
  DOING: {
    LOGIN: string;
    REGISTER: string;
  };
}

const LABELS: LablesConstants = {
  IDLE: { LOGIN: "Login", REGISTER: "Register" },
  DOING: { LOGIN: "Logging in...", REGISTER: "Registering..." },
};

export const StyledLinearProgressHOC = (passwordStrength: number) =>
  styled(LinearProgress)(() => {
    let x = "";
    switch (passwordStrength) {
      case 0:
        break;
      case 1:
        x = "red";
        break;
      case 2:
        x = "orange";
        break;
      case 3:
        x = "yellow";
        break;
      case 4:
        x = "green";
        break;
      default:
        x = "gray";
        break;
    }
    return {
      height: 10,
      borderRadius: 5,
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: x,
      },
    };
  });

const CaphubAuth: FC<CaphubAuthProps> = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [isRegisterHaveCode, setIsRegisterHaveCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LablesConstants>("IDLE");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { getUser } = useContext(UserContext);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const axiosInstance = useContext(MainServerContext);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score);
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isLoginForm) {
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
    } else if (!isRegisterHaveCode) {
      axiosInstance.post(domain + "auth/signupreq", { email });
      setIsRegisterHaveCode(true);
    } else {
      if (
        validateEmail(email) &&
        password.length >= 6 &&
        name.length > 0 &&
        password === confirmPassword
      ) {
        axiosInstance
          .post(domain + "auth/signupfin", {
            email,
            key,
            fullname: name,
            password,
            passwordagain: confirmPassword,
          })
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

  const StyledLinearProgress = StyledLinearProgressHOC(passwordStrength);

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <ToastContainer />
      {/* Dialog component for Login/Register form */}
      <Dialog open={true} onClose={() => {}}>
        {/* Dialog title, changes based on whether it is a login or register form */}
        <DialogTitle>{isLoginForm ? "Login" : "Register"}</DialogTitle>
        <DialogContent>
          {/* Form element that submits data on pressing enter or clicking the submit button */}
          <form onSubmit={handleSubmit}>
            {/* Name input field - Only visible in the Register form */}
            {!isLoginForm && isRegisterHaveCode && (
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={name}
                error={name.length === 0}
                helperText={name.length === 0 ? "Name is required" : ""}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {/* Email input field */}
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
            {/* Password input field */}
            {(isLoginForm || isRegisterHaveCode) && (
              <TextField
                margin="dense"
                data-testid="password"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={handlePasswordChange}
                error={!isLoginForm && passwordStrength < 3}
                helperText={
                  !isLoginForm && passwordStrength < 3
                    ? "Password Strength has to be at least Yellow"
                    : ""
                }
              />
            )}
            {/* Password strength indicator - Only visible in the Register form */}
            {!isLoginForm && isRegisterHaveCode && (
              <Box my={1}>
                <StyledLinearProgress
                  value={passwordStrength * 25}
                  variant="determinate"
                />
              </Box>
            )}
            {/* Confirm Password input field - Only visible in the Register form */}
            {!isLoginForm && isRegisterHaveCode && (
              <>
                {" "}
                <TextField
                  margin="dense"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={confirmPassword}
                  error={password !== confirmPassword}
                  helperText={
                    password !== confirmPassword ? "Passwords do not match" : ""
                  }
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <TextField
                  margin="dense"
                  label="key"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={key}
                  error={!key}
                  helperText={key ? "" : "Enter the key from you email inbox"}
                  onChange={(e) => setKey(e.target.value)}
                />
              </>
            )}
            {/* Submit button */}

            <Box mt={2}>
              <Button
                type="submit"
                data-testid="login-button"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLoginForm
                  ? LABELS[buttonLabel].LOGIN
                  : LABELS[buttonLabel].REGISTER}
              </Button>
            </Box>
            {/* Add LinkedIn authentication button */}
            {isLoginForm && (
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
            )}

            {/* Toggle between Login and Register form */}
            <Box mt={1}>
              <Typography align="center">
                {isLoginForm
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <Button color="primary" onClick={toggleForm}>
                  {isLoginForm ? "Register" : "Login"}
                </Button>
              </Typography>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CaphubAuth;
