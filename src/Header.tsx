import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to determine if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  // Function to handle the click event of the mobile menu button
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle closing the mobile menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full p-2 bg-white shadow-xl">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/mainLogo.png"}
          alt="PERMIAS LOGO"
          width={250}
        />
      </Link>
      {/* Hamburger Icon for Mobile */}
      <button onClick={handleMenuToggle} className="z-20 sm:hidden">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 z-10 w-full bg-white transition-transform transform ${
          isMenuOpen ? "scale-y-100" : "scale-y-0"
        } origin-top duration-300 ease-in-out sm:hidden`}
      >
        <div className="flex flex-col items-center py-5">
          {/* Mobile navigation links */}
          <Link
            to="/"
            className={`text-sxl text-footer relative inline-block my-2 ${
              isActive("/") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Home
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                isActive("/") ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
          {/* Repeat for other links, ensure to replace the to="/" and isActive("/") with the correct path */}
          <Link
            to="/about-us"
            className={`text-sxl text-footer relative inline-block my-2 ${
              isActive("/about-us") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            About Us
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                isActive("/about-us") ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
          <Link
            to="/team"
            className={`text-sxl text-footer relative inline-block my-2 ${
              isActive("/team") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Team
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                isActive("/team") ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
          <Link
            to="/events"
            className={`text-sxl text-footer relative inline-block my-2 ${
              isActive("/events") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Events
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                isActive("/events") ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
          <Link
            to="/merch"
            className={`text-sxl text-footer relative inline-block my-2 ${
              isActive("/merch") ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            Merch
            <span
              className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                isActive("/merch") ? "scale-x-100" : "scale-x-0"
              }`}
            ></span>
          </Link>
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="items-center hidden ml-4 sm:flex">
        <Link
          to="/"
          className={`mx-2 text-sxl text-footer relative inline-block group ${
            isActive("/") ? "scale-x-100" : ""
          }`}
        >
          Home
          <span
            className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
              isActive("/") ? "scale-x-100" : ""
            }`}
          ></span>
        </Link>
        <Link
          to="/about-us"
          className={`mx-2 text-sxl text-footer relative inline-block group ${
            isActive("/about-us") ? "scale-x-100" : ""
          }`}
        >
          About Us
          <span
            className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
              isActive("/about-us") ? "scale-x-100" : ""
            }`}
          ></span>
        </Link>
        <Link
          to="/team"
          className={`mx-2 text-sxl text-footer relative inline-block group ${
            isActive("/team") ? "scale-x-100" : ""
          }`}
        >
          Team
          <span
            className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
              isActive("/team") ? "scale-x-100" : ""
            }`}
          ></span>
        </Link>
        <Link
          to="/events"
          className={`mx-2 text-sxl text-footer relative inline-block group ${
            isActive("/events") ? "scale-x-100" : ""
          }`}
        >
          Events
          <span
            className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
              isActive("/events") ? "scale-x-100" : ""
            }`}
          ></span>
        </Link>
        <Link
          to="/merch"
          className={`mx-2 text-sxl text-footer relative mr-[50px] inline-block group ${
            isActive("/merch") ? "scale-x-100" : ""
          }`}
        >
          Merch
          <span
            className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
              isActive("/merch") ? "scale-x-100" : ""
            }`}
          ></span>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
