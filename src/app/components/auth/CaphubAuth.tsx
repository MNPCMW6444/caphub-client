import { FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import zxcvbn from "zxcvbn";
import styled from "@emotion/styled";

interface CapHubAuthProps {}

const CapHubAuth: React.FC<CapHubAuthProps> = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

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
      if (
        validateEmail(email) &&
        name.length > 0 &&
        password === confirmPassword &&
        passwordStrength >= 3 // Adjust this number to set the minimum password strength requirement
      ) {
        // Handle register logic here
        console.log({ email, password, name, confirmPassword });
      }
    } else {
      if (
        validateEmail(email) &&
        password.length >= 6 &&
        name.length > 0 &&
        password === confirmPassword
      ) {
        // Handle register logic here
        console.log({ email, password, name, confirmPassword });
      }
    }
  };

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>{isLoginForm ? "Login" : "Register"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {!isLoginForm && (
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
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              error={passwordStrength < 3}
              helperText={
                passwordStrength < 3
                  ? "Password Strength has to be at least Yellow"
                  : ""
              }
            />
            <Box my={1}>
              <StyledLinearProgress
                value={passwordStrength * 25}
                variant="determinate"
              />
            </Box>
            {!isLoginForm && (
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
            )}
            {isLoginForm && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
            )}
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
