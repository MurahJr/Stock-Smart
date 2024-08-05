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
}));

const Logo = styled('img')({
  height: '50px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
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
      <NavLink to="/">StockSmart</NavLink>
    </HeaderContainer>
    <hr
      style={{
        color: "#FFF",
        background: "#FFF",
        borderColor: "#FFF",
        height: "0.5px",
      }}
    />
  </div>
);

export default Header;
