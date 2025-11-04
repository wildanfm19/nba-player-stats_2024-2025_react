import React from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { Github, GithubIcon, InstagramIcon } from "lucide-react";

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

      {/* Footer */}
      <footer className="mt-8 border-t bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} NBA Stats — Built for learning & demo</div>

          <nav className="flex items-center gap-4">
            <a href="https://github.com/wildanfm19" target="_blank" rel="noreferrer" className="text-sm text-black hover:underline"><GithubIcon/></a>
            <a href="https://www.instagram.com/wildnfm/" target="_blank" rel="noreferrer" className="text-sm text-black hover:underline"><InstagramIcon/></a>

          </nav>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
