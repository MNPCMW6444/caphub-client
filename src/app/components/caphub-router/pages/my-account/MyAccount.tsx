import { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import { toast } from "react-toastify";
import UserContext from "../../../../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import EditableTextField from "./EditableTextField";
import PasswordTextField from "./PasswordTextField";

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

export const StyledDivider = styled(Divider)`
  margin-top: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
  margin-bottom: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
`;

export const StyledTextField: any = styled(TextField)`
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
              <PasswordTextField
                InputLabelProps={{
                  shrink: true,
                }}
                label="Password"
                value={password || ""}
                value2={repeatPassword}
                type="password"
                InputProps={{
                  readOnly: !isEditingPassword,
                  startAdornment: <LockIcon />,
                }}
                fullWidth
                onEditSave={handleUpdatePassword}
                setter={setPassword}
                setter2={setRepeatPassword}
              />
            </Grid>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default MyAccount;
