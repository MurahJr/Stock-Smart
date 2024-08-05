import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/pantryaccess.png";
import { styled } from "@mui/material/styles";

const HeaderContainer = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#2E3B55',
  color: '#FFF',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled('img')({
  height: '50px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const NavLinksContainer = styled('nav')({
  display: 'flex',
  alignItems: 'center',
});

const NavLink = styled(Link)({
  color: '#FFF',
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
  marginLeft: '20px',
  transition: 'color 0.3s ease-in-out',
  '&:hover': {
    color: '#FFC107',
  },
});

const Header = () => (
  <div>
    <HeaderContainer>
      <Link to="/">
        <Logo src={logo} alt="StockSmart logo" />
      </Link>
      <NavLinksContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/myrequests">My Requests</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </NavLinksContainer>
    </HeaderContainer>
    <hr
      style={{
        color: "#FFF",
        backgroundColor: "#FFF",
        borderColor: "#FFF",
        height: "0.5px",
        margin: "0",
      }}
    />
  </div>
);

export default Header;
