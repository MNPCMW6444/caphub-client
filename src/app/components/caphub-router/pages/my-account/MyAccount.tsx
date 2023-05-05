import { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import UserContext from "../../../../context/UserContext";
import { StyledLinearProgressHOC } from "../../../auth/CaphubAuth";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(32) : 32}px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
  margin-bottom: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
`;

const MyAccount: FC = () => {
  const { user, getUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const axiosInstance = useContext(MainServerContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    user && setName(user.name);
  }, [user]);

  const handleUpdateName = async () => {
    try {
      await axiosInstance.post(
        "auth/updatename",
        { name },
        { withCredentials: true }
      );
      setIsEditingName(false);
      toast("Name updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await axiosInstance.post(
        "auth/updatepassword",
        { password },
        { withCredentials: true }
      );
      setIsEditingPassword(false);
      toast("Password updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsPasswordValid(
      !!(password && repeatPassword && password === repeatPassword)
    );
  }, [password, repeatPassword]);

  const [passwordStrength, setPasswordStrength] = useState<number>(0);

  const StyledLinearProgress = StyledLinearProgressHOC(passwordStrength);

  useEffect(() => {
    setPasswordStrength(zxcvbn(password).score);
  }, [password]);

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>
      <Grid container spacing={4}>
        <Grid item container spacing={2}>
          <Grid item xs={9}>
            <StyledTextField
              InputLabelProps={{
                shrink: user?.name ? true : undefined,
              }}
              label="Name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                readOnly: !isEditingName,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            {!isEditingName && (
              <Button variant="outlined" onClick={() => setIsEditingName(true)}>
                Edit
              </Button>
            )}
            {isEditingName && (
              <>
                <Button variant="contained" onClick={handleUpdateName}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditingName(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={9}>
            {" "}
            <StyledTextField
              InputLabelProps={{
                shrink: user?.email ? true : undefined,
              }}
              label="Email"
              value={user?.email || ""}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={9}>
            <StyledTextField
              InputLabelProps={{
                shrink: true,
              }}
              label="Password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              InputProps={{
                readOnly: !isEditingPassword,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            {!isEditingPassword && (
              <Button
                variant="outlined"
                onClick={() => setIsEditingPassword(true)}
              >
                Edit
              </Button>
            )}
            {isEditingPassword && (
              <>
                <Button variant="contained" onClick={handleUpdatePassword}>
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditingPassword(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      {isEditingPassword && (
        <>
          <Box my={2}>
            <StyledTextField
              label="Confirm Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={!isPasswordValid}
              helperText={!isPasswordValid && "Passwords do not match"}
              fullWidth
            />
          </Box>
          <Box my={1}>
            <StyledLinearProgress
              value={passwordStrength * 25}
              variant="determinate"
            />
          </Box>
        </>
      )}
    </StyledContainer>
  );
};

export default MyAccount;
