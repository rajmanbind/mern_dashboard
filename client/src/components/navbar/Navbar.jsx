import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getToken } from "../../services/localStorageService";
const Navbar = () => {
  const token = getToken("token");
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  // const logoutMe = () => {
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 2500);
  // };
  // console.log(token);
  const style = {
    backgroundColor: "#6d1b7b",
    opacity: 1,
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography
              variant="h5"
              to="/dashboard"
              component={NavLink}
              sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
            >
              BaBa
            </Typography>
            <Button
              component={NavLink}
              to="/"
              sx={{
                color: "white",
                opacity: 0.7,
                ...(location === "" ? style : ""),
              }}
            >
              Home
            </Button>
            {token && (
              <Button
                component={NavLink}
                to="/dashboard"
                sx={{
                  color: "white",
                  opacity: 0.7,
                  ...(location === "dashboard" ? style : ""),
                }}
              >
                Dashboard
              </Button>
            )}
            <Button
              component={NavLink}
              to="/contact"
              sx={{
                color: "white",
                opacity: 0.7,
                ...(location === "contact" ? style : ""),
              }}
            >
              Contact
            </Button>
            {!token && (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  sx={{
                    color: "white",
                    opacity: 0.7,
                    ...(location === "login" ? style : ""),
                  }}
                >
                  login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  sx={{
                    color: "white",
                    opacity: location === "register" ? 1 : 0.7,
                    backgroundColor: location === "register" ? "#6d1b7b" : "",
                  }}
                >
                  Register
                </Button>
              </>
            )}

            {/* <Typography variant="h6" component="span">
              Raj
            </Typography> */}

            {/* <Button
              component={NavLink}
              to="/login"
              sx={{
                color: "white",
                opacity: location === "register" ? 1 : 0.7,
                backgroundColor: location === "register" ? "#6d1b7b" : "",
              }}
              onClick={logoutMe}
            >
              Logout
            </Button> */}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
