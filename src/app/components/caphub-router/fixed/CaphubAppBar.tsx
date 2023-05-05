import { FC, useContext, useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import domain from "../../../util/config/domain";
import { toast } from "react-toastify";
import { MainServerContext } from "@caphub-group/mainserver-provider";
import UserContext from "../../../context/UserContext";

interface LogoutConstants {
  IDLE: string;
  DOING: string;
}
const LOGOUT: LogoutConstants = { IDLE: "Logout", DOING: "Logging out..." };

interface CaphubAppBarProps {
  onMobileDrawerToggle?: () => void;
}

const CaphubAppBar: FC<CaphubAppBarProps> = ({ onMobileDrawerToggle }) => {
  const [logoutState, setLogoutState] = useState<keyof LogoutConstants>("IDLE");
  const axiosInstance = useContext(MainServerContext);
  const { getUser } = useContext(UserContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    return () => {
      setLogoutState("IDLE");
    };
  }, [logoutState]);

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
    <AppBar position="fixed">
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={onMobileDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Caphub
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="logout"
          onClick={() => {
            setLogoutState("DOING");
            handleLogoutClick();
          }}
        >
          {LOGOUT[logoutState]}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CaphubAppBar;
