import React, { useContext } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MainServerContext } from "../../context/MainServerContext";
import domain from "../../util/config/domain";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";

interface LogoutConstants {
  IDLE: string;
  DOING: string;
}
const LOGOUT: LogoutConstants = { IDLE: "Logout", DOING: "Logging out..." };

const CapHubAppBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logoutState, setLogoutState] =
    React.useState<keyof LogoutConstants>("IDLE");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const axiosInstance = useContext(MainServerContext);

  const { getUser } = useContext(UserContext);

  const handleLogoutClick = () =>
    axiosInstance
      .get(domain + "auth/signout")
      .then(() => getUser())
      .catch((error) => {
        setLogoutState("IDLE");
        toast.error(
          error?.response?.data.clientError ||
            error?.message ||
            "Unknown error, Make sure you are Online"
        );
      });

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CapHub
          </Typography>
          <div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  setLogoutState("DOING");
                  handleLogoutClick();
                }}
              >
                {LOGOUT[logoutState]}
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default CapHubAppBar;
