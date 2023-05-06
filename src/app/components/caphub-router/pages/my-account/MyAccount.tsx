import { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import { toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import UserContext from "../../../../context/UserContext";
import { StyledLinearProgressHOC } from "../../../auth/CaphubAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import EditableTextField from "./EditableTextField";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(32) : 32}px;
  background: linear-gradient(45deg, #3a7bd5, #00d2ff);
  min-height: 100vh;
`;

const StyledTypography = styled(Typography)`
  color: #ffffff;
`;

const StyledPaper = styled(Paper)`
  padding: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(4) : 4}px;
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  margin-top: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
  margin-bottom: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
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
  const setIsEditingNamex = useState(false);
  const setIsEditingName = setIsEditingNamex[1];
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
      getUser();
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
      getUser();
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
      <StyledTypography variant="h4" gutterBottom>
        Account Management
      </StyledTypography>
      <StyledPaper elevation={3}>
        <Grid container direction="column" spacing={2}>
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <EditableTextField
                InputLabelProps={{
                  shrink: user?.name ? true : undefined,
                }}
                label="Name"
                value={name || ""}
                onEditSave={handleUpdateName}
                setter={setName}
                InputProps={{
                  startAdornment: <AccountCircleIcon />,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <StyledDivider />
          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                InputLabelProps={{
                  shrink: user?.email ? true : undefined,
                }}
                label="Email"
                value={user?.email || ""}
                InputProps={{
                  readOnly: true,
                  startAdornment: <EmailIcon />,
                }}
                fullWidth
              />
            </Grid>
          </Grid>
          <StyledDivider />
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
                  startAdornment: <LockIcon />,
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
          {isEditingPassword && (
            <>
              <StyledDivider />
              <Grid item container spacing={2}>
                <Grid item xs={3}>
                  <StyledTextField
                    label="Confirm Password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    error={!isPasswordValid}
                    helperText={!isPasswordValid && "Passwords do not match"}
                    fullWidth
                  />
                </Grid>
                <Grid item container spacing={2}>
                  <Grid item xs={3}>
                    <StyledLinearProgress
                      value={passwordStrength * 25}
                      variant="determinate"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default MyAccount;
