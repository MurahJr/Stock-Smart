import React from "react";
import { Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: "#2E3B55",
  padding: "20px 0",
  position: "relative",
  left: "0",
  right: "0",
  color: "#FFF",
  textAlign: "center",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: "#FFF",
  textDecoration: "none",
  "&:hover": {
    color: "#FFC107",
    transition: "color 0.3s ease-in-out",
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  margin: "0.5em 0",
}));

function Footer() {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      <FooterText variant="subtitle2" component="p">
        <Stack spacing={1}>
          Pantry Access
          <FooterLink href="/Contact" rel="noopener">
            Contact Us
          </FooterLink>
          <FooterLink href="https://github.com/Pantry-Access-AFG" target="_blank" rel="noopener">
            Documentation
          </FooterLink>
          <FooterText>
            &copy; {new Date().getFullYear()} StockSmart. All Rights Reserved.
          </FooterText>
        </Stack>
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;
