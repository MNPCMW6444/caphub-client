import CapHubAuth from "../auth/CapHubAuth";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MyAccount from "./my-account/MyAccount";
import About from "./about/About";
import Home from "./home/Home";
import { MouseEvent, FC, useContext, useState, useEffect } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import domain from "../../util/config/domain";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import { Divider } from "@mui/material";

interface LogoutConstants {
  IDLE: string;
  DOING: string;
}
const LOGOUT: LogoutConstants = { IDLE: "Logout", DOING: "Logging out..." };

const CapHubRouter: FC = () => {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      {user ? <AuthenticatedApp /> : <CapHubAuth />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

const AuthenticatedApp: FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [logoutState, setLogoutState] = useState<keyof LogoutConstants>("IDLE");
  const axiosInstance = useContext(MainServerContext);
  const { getUser } = useContext(UserContext);

  useEffect(() => {
    return () => {
      setAnchorEl(null);
      setLogoutState("IDLE");
    };
  }, [logoutState]);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    <>
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
              <MenuItem onClick={() => navigate("/")}>Home</MenuItem>
              <MenuItem onClick={() => navigate("/my-account")}>
                My Account
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLogoutState("DOING");
                  handleLogoutClick();
                }}
              >
                {LOGOUT[logoutState]}
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/about")}>About</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default CapHubRouter;
