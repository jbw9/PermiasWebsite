import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <div className="flex items-center justify-between w-full p-2">
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/mainLogo.png"}
          alt="PERMIAS LOGO"
          width={250}
        />
      </Link>
      <nav className="flex items-center ml-4">
        <Link
          to="/"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/") ? "border-b-2 border-current" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/about-us") ? "border-b-2 border-current" : ""
          }`}
        >
          About Us
        </Link>
        <Link
          to="/team"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/team") ? "border-b-2 border-current" : ""
          }`}
        >
          Team
        </Link>
        <Link
          to="/events"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/events") ? "border-b-2 border-current" : ""
          }`}
        >
          Events
        </Link>
        <Link
          to="/merch"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/merch") ? "border-b-2 border-current" : ""
          }`}
        >
          Merch
        </Link>
        <Link
          to="/guide"
          className={`mx-2 text-2xl font-semibold ${
            isActive("/guide") ? "border-b-2 border-current" : ""
          }`}
        >
          Guide
        </Link>
      </nav>
    </div>
  );
};

export default Header;
