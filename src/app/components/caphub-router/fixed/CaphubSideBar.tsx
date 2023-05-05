import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

interface CaphubSideBarProps {
  mobileDrawerOpen: boolean;
  onMobileDrawerToggle: () => void;
}

const CaphubSideBar: FC<CaphubSideBarProps> = ({
  mobileDrawerOpen,
  onMobileDrawerToggle,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "My Account", route: "/my-account" },
    { label: "About", route: "/about" },
  ];

  const handleMenuItemClick = (route: string) => {
    navigate(route);
    if (isMobile) {
      onMobileDrawerToggle();
    }
  };

  const renderMenuItems = () => (
    <List>
      {menuItems.map((item, index) => (
        <ListItem
          button
          key={index}
          onClick={() => handleMenuItemClick(item.route)}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
      <Divider />
      <ListItem button onClick={() => navigate("/logout")}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={onMobileDrawerToggle}
        >
          {renderMenuItems()}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: "240px",
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: "240px", boxSizing: "border-box" },
          }}
        >
          {renderMenuItems()}
        </Drawer>
      )}
    </Box>
  );
};

export default CaphubSideBar;
