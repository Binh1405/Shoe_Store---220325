import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import logoImg from "../logo.png";
import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAuth from "../hooks/useAuth";

function Logo({ disabledLink = false, sx }) {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  const handleRegister = () => {
    navigate(`/register`);
  };
  const handleHome = () => {
    navigate(`/`);
  };
  const handleLogout = async () => {
    try {
      handleClose();
      await logout(() => {
        navigate(`/login`);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {logo}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleHome}>Home</MenuItem>
        <MenuItem onClick={handleRegister}>Register</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleClose}>Close</MenuItem>
      </Menu>
    </div>
  );
}

export default Logo;
