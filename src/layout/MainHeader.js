import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { Badge, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useSelector } from "react-redux";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

function MainHeader() {
  const auth = useAuth();
  const user = auth.user;
  const navigate = useNavigate();
  const quantity = useSelector((state) => state.cart.quantity).toString();
  console.log("user", user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
        <Grid container spacing={3} sx={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
          <Grid item xs={3} sx={{display: "flex", alignItems: "center", ml: "2rem"}}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, borderRadius: "50%", width: "3rem", height: "3rem" }}
          >
            <Logo />
          </IconButton>
          <Typography color="success.darker" component="div" >
                Vechai
              </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(`/myCart`)}
            sx={{borderRadius: "50%", width: "3rem", height: "3rem"}}
          >
              <Typography color="primary.darker">
                <Badge badgeContent={quantity}>
                  <Typography color="secondary.main">
                    <ShoppingCartOutlinedIcon />
                  </Typography>
                </Badge>
              </Typography>
              </IconButton>
          </Grid>
          <Grid item xs={3}>
          <Typography color="success.dark" component="div" >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ borderRadius: "50%", width: "3rem", height: "3rem" }}
            onClick={() => navigate('/admin')}
          >
            <AdminPanelSettingsIcon/>
            </IconButton>
                admin
              </Typography>
          </Grid>
          <Grid item xs={3}>
          <Box sx={{ flexGrow: 1 }}>
          <Typography color="success.main" component="div">
            Hello {user?.name}, welcome to Vechai
          </Typography>
          </Box>
          </Grid>
        </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
