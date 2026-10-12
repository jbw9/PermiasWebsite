import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteContent } from "./hooks/useSiteContent";
import { getImageSrc } from "./utils/imageSrc";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about-us", label: "About Us" },
  { path: "/team", label: "Team" },
  { path: "/events", label: "Events" },
  { path: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const content = useSiteContent(["header_logo_url"], {
    header_logo_url: "/mainLogo.png",
  });

  const isActive = (path: string): boolean => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center justify-between w-full p-2 bg-white shadow-xl">
      <Link to="/">
        <img
          src={getImageSrc(content.header_logo_url)}
          alt="PERMIAS LOGO"
          width={250}
        />
      </Link>
      {/* Hamburger Icon for Mobile */}
      <button onClick={toggleMenu} className="z-20 sm:hidden">
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
        className={`absolute top-full left-0 z-10 w-full bg-white shadow-xl transition-transform transform ${
          isMenuOpen ? "scale-y-100" : "scale-y-0"
        } origin-top duration-300 ease-in-out sm:hidden`}
      >
        <div className="flex flex-col items-center py-5">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="text-sxl text-footer relative inline-block my-2"
              onClick={closeMenu}
            >
              {label}
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-red transition-all duration-150 ${
                  isActive(path) ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <nav className="items-center hidden ml-4 sm:flex">
        {NAV_LINKS.map(({ path, label }, i) => (
          <Link
            key={path}
            to={path}
            className={`mx-2 text-sxl text-footer relative inline-block group ${
              i === NAV_LINKS.length - 1 ? "mr-[50px]" : ""
            }`}
          >
            {label}
            <span
              className={`absolute bg-red bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${
                isActive(path) ? "scale-x-100" : ""
              }`}
            ></span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
