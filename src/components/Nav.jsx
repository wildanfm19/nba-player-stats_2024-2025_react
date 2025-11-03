import { HomeIcon, Menu, Shirt, Users, X } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiTeamLine } from "react-icons/ri";
import Header from "./Header";

const NavLinks = () => {
  const linkClass = "text-white px-3 py-1 hover:underline flex items-center gap-2";
  return (
    <>
      <NavLink to="/home" className={linkClass}><HomeIcon size={16}/><span className="hidden sm:inline">Home</span></NavLink>
      <NavLink to="/team" className={linkClass}><Users size={16}/> <span className="hidden sm:inline">Team</span></NavLink>
      <NavLink to="/position" className={linkClass}><Shirt size={16}/> <span className="hidden sm:inline">Position</span></NavLink>
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
      {/* Desktop: show links inside a black rounded container on the right */}
      <nav className="flex items-center">
        <div className="hidden md:flex md:items-center md:space-x-2 bg-black rounded-md px-3 py-1">
          <NavLinks />
        </div>
        <div className="md:hidden">
          <button onClick={toggleNavBar} className="text-white">{isOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      {isOpen && (
        // Mobile dropdown: full-width black background matching the desktop nav
        <div className="flex basis-full flex-col items-center bg-black text-white w-full py-2 md:hidden topbar-text-shadow">
          <NavLinks />
        </div>
      )}
    </>
  );
};

export default Nav;
