import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import "./styles.css";
import { MdHome } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineInfo } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { MdLogin } from "react-icons/md";
const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  return (
    <nav className="navbar">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "brand" : "brand")}
      >
        Mini <span>Blog</span>
      </NavLink>
      <ul className="links_list">
        <li>
          <NavLink to="/">
            <span className="webdevice">Home</span>
            <span className="mobiledevice"><MdHome size={21} /></span>
          </NavLink>
          <NavLink to="/About">
            <span className="webdevice">Sobre</span>
            <span className="mobiledevice"><AiOutlineInfo /></span>
          </NavLink>
          {!user && (
            <>
              <NavLink to="/Login">
                <span className="webdevice" >Login</span>
                <span className="mobiledevice"><MdLogin size={21}/></span>
              </NavLink>
              <NavLink to="/Register">
                <span >Registrar</span>
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink to="/Post/create">
                <span className="webdevice">Novo post</span>
                <span className="mobiledevice"><AiOutlinePlusCircle size={21} /></span>
              </NavLink>
              <NavLink to="/Dashboard">
                <span className="webdevice">Dashboard</span>
                <span className="mobiledevice"><MdDashboard size={21}/></span>
              </NavLink>
            </>
          )}
        </li>
        {user && (
          <li>
            <button onClick={logout}>
              <span className="webdevice">Sair</span>
              <span className="mobiledevice"><MdLogout size={21}/></span>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
