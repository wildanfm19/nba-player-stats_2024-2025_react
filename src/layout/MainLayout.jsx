import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-black">
        <div className="mx-auto flex items-center justify-between px-6 py-4 text-white topbar-text-shadow">
          <Header />
          <Nav />
        </div>
      </div>

      {/* Page Content */}
      <div className="px-6 py-8">{children}</div>
    </div>
  );
};

export default MainLayout;
