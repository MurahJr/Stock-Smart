import React from "react";
import { Typography, Link, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main, // Match the AppBar color
  padding: "40px 20px",
  position: "relative",
  bottom: "0",
  width: "100%",
  color: theme.palette.common.white,
  textAlign: "center",
  boxShadow: `0 -2px 5px rgba(0, 0, 0, 0.1)`,
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main, // Match hover color of AppBar
  textDecoration: "none",
  fontWeight: "bold",
  "&:hover": {
    color: theme.palette.secondary.light, // Lighter color on hover
    transition: "color 0.3s ease-in-out",
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  margin: "0.5em 0",
}));

const FooterLogo = styled('img')(({ theme }) => ({
  width: "100px",
  marginBottom: "10px",
}));

function Footer() {
  return (
    <FooterContainer>
      <FooterLogo src="/log.png" alt="StockSmart Logo" />
      <Stack spacing={2}>
        <FooterText variant="subtitle1" component="p">
          Welcome to StockSmart
        </FooterText>
        <FooterText variant="subtitle2">
          <Stack direction="row" spacing={2} justifyContent="center">
            <FooterLink href="/Contact" rel="noopener">
              Contact Us
            </FooterLink>
            
          </Stack>
        </FooterText>
        <FooterText variant="caption">
          &copy; {new Date().getFullYear()} StockSmart. All Rights Reserved.
        </FooterText>
      </Stack>
    </FooterContainer>
  );
}

export default Footer;
