import { FC, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button, Container, TextField, Typography } from "@mui/material";
import { MainServerContext } from "@caphub-funding/mainserver-provider";
import UserContext from "../../../context/UserContext";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(4) : 4}px;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${(props) =>
    props.theme.spacing instanceof Function ? props.theme.spacing(2) : 2}px;
`;

const MyAccount: FC = () => {
  const { user, getUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [repeatPassword] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const axiosInstance = useContext(MainServerContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleUpdateName = async () => {
    try {
      await axiosInstance.post(
        "auth/updatename",
        { name },
        { withCredentials: true }
      );
      setIsEditingName(false);
      alert("Name updated successfully!");
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
      alert("Password updated successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (password && repeatPassword && password === repeatPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }, [password, repeatPassword]);

  return (
    <StyledContainer maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>
      <StyledTextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputProps={{
          readOnly: !isEditingName,
          endAdornment: (
            <>
              {!isEditingName && (
                <Button
                  variant="outlined"
                  onClick={() => setIsEditingName(true)}
                >
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
            </>
          ),
        }}
        fullWidth
      />
      <StyledTextField
        label="Email"
        value={user?.email}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
      />
      <StyledTextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        InputProps={{
          readOnly: !isEditingPassword,
          endAdornment: (
            <>
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
            </>
          ),
        }}
        fullWidth
      />
      {isEditingPassword && (
        <StyledTextField
          label="Confirm Password"
          value={repeatPassword}
          type="password"
          onChange={(e) =>
            setIsPasswordValid(
              e.target.value === password && e.target.value.length > 0
            )
          }
          error={!isPasswordValid}
          helperText={!isPasswordValid && "Passwords do not match"}
          fullWidth
        />
      )}
    </StyledContainer>
  );
};

export default MyAccount;
