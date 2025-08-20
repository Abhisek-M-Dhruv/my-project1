// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
// import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-router-dom";

import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { Box, IconButton, Button, Divider } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Define shake animation
const shake = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(-2px, 0); }
  50% { transform: translate(2px, 0); }
  75% { transform: translate(-2px, 0); }
  100% { transform: translate(0, 0); }
`;

// Styled Badge with conditional animation
const AnimatedBadge = styled(Badge)(({ animate }) => ({
  ...(animate && {
    animation: `${shake} 0.4s ease`,
  }),
}));

export default function Navbar({ cartItemCount = 0 }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (cartItemCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 400); // reset after animation
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Left: Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
        >
          <Box
            component="img"
            src="https://online.kfc.co.in/static/media/kfcLogo.492728c6.svg"
            alt="KFC Logo"
            sx={{ height: 40 }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            Menu
          </Button>
        </Box>
        <AccountCircle />
        &nbsp; &nbsp;
        <Divider orientation="vertical" flexItem />
        {/* Cart with shaking badge */}
        <IconButton component={RouterLink} to="/cart" color="inherit">
          <AnimatedBadge
            badgeContent={cartItemCount}
            color="primary"
            animate={animate ? 1 : 0}
          >
            <Box
              component="img"
              src="https://images.ctfassets.net/wtodlh47qxpt/6qtBVFuno7pdwOQ9RIvYm9/d13e9b7242980972cf49beddde2cc295/bucket_cart_icon.svg"
              alt="Cart"
              sx={{ height: 30 }}
            />
          </AnimatedBadge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
