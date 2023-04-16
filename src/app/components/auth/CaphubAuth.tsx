import { FormEvent, useContext, useState } from "react";
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
import { MainServerContext } from "../../context/MainServerContext";
import UserContext from "../../context/UserContext";

interface CapHubAuthProps {}

const CapHubAuth: React.FC<CapHubAuthProps> = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [isRegisterHaveCode, setIsRegisterHaveCode] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { getUser } = useContext(UserContext);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const axiosInstance = useContext(MainServerContext);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
      case 1:
        return "red";
      case 2:
        return "orange";
      case 3:
        return "yellow";
      case 4:
        return "green";
      default:
        return "gray";
    }
  };

  const StyledLinearProgress = styled(LinearProgress)(() => ({
    height: 10,
    borderRadius: 5,
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: getPasswordStrengthColor(),
    },
  }));

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
          .then(() => getUser());
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
          .then(() => getUser());
      }
    }
  };

  return (
    <Box width="100%" height="100%" bgcolor="black">
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
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLoginForm ? "Login" : "Register"}
              </Button>
            </Box>
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

export default CapHubAuth;