import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiTeamLine } from "react-icons/ri";
import Header from "./Header";

const NavLinks = () => {
  const linkClass = "text-white px-3 py-1 hover:underline flex items-center gap-2";
  return (
    <>
      <NavLink to="/about" className={linkClass}><RiTeamLine size={16}/><span className="hidden sm:inline">Teams</span></NavLink>
      <NavLink to="/blog" className={linkClass}>Blog</NavLink>
      <NavLink to="/projects" className={linkClass}>Projects</NavLink>
    </>
  );
};

const Nav = () => {
  const [isOpen, setISOpen] = useState(false);

  const toggleNavBar = () => {
    setISOpen(!isOpen);
  };

  return (
    <>
      <nav className="flex items-center">
        <div className="hidden md:flex md:items-center md:space-x-2">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavBar} className="text-white">{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isOpen && (
        <div className="flex basis-full flex-col items-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-400 text-white w-full py-2 md:hidden topbar-text-shadow">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
