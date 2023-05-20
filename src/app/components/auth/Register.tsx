import { ChangeEvent, FormEvent, useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import zxcvbn from "zxcvbn";
import domain from "../../util/config/domain";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import UserContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { LABELS, LablesConstants, StyledLinearProgressHOC } from "./Login";

const CaphubAuth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<keyof LablesConstants>("IDLE");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { getUser } = useContext(UserContext);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const axiosInstance = useContext(MainServerContext);

  const navigate = useNavigate();

  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();

  useEffect(() => {
    setKey(query.get("key") || "");
  }, [query]);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(zxcvbn(newPassword).score);
  };

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!key) {
      axiosInstance.post(domain + "auth/signupreq", { email });
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

  const StyledLinearProgress = StyledLinearProgressHOC(passwordStrength);

  return (
    <Box width="100%" height="100%" bgcolor="black">
      <ToastContainer />
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {key && (
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
            {key && (
              <TextField
                margin="dense"
                data-testid="password"
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
            )}
            {key && (
              <Box my={1}>
                <StyledLinearProgress
                  value={passwordStrength * 25}
                  variant="determinate"
                />
              </Box>
            )}
            {key && (
              <>
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
            <Box mt={2}>
              <Button
                type="submit"
                data-testid="login-button"
                variant="contained"
                color="primary"
                fullWidth
              >
                {LABELS[buttonLabel].REGISTER}
              </Button>
            </Box>

            <Box mt={1}>
              <Typography align="center">
                Already have an account?
                <Button color="primary" onClick={() => navigate("/")}>
                  Login here
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
