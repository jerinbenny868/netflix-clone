import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthUserStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const NavBar = () => {
  const [mobbileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthUserStore();
  const { setContentType } = useContentStore();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobbileMenuOpen);
  };
  // console.log("ContentType", contentType);
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>
        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            TV Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="avathar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer " onClick={toggleMobileMenu} />
        </div>
      </div>

      {/* mobile menu toggle button */}
      {mobbileMenuOpen && (
        <div className="sm:hidden items-center gap-4 w-full mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline"
            onClick={toggleMobileMenu}
          >
            TV Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
