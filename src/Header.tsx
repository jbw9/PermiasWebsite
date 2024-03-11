import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  // Function to determine if the link is active
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <div className="flex items-center justify-between fixed top-0 left-0 w-full p-2 z-10 bg-groundBase">
      <Link to="/">
        <img src={process.env.PUBLIC_URL + "/mainLogo.png"} alt="PERMIAS LOGO" width={250} />
      </Link>
      <nav className="flex items-center ml-4">
        <Link to="/" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/")}`}>
          Home
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/about-us" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/about-us")}`}>
          About Us
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/about-us") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/team" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/team")}`}>
          Team
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/team") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/events" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/events")}`}>
          Events
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/events") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/merch" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/merch")}`}>
          Merch
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/merch") ? "scale-x-100" : ""}`}></span>
        </Link>
        <Link to="/guide" className={`mx-2 text-sxl text-footer relative inline-block group ${isActive("/guide")}`}>
          Guide
          <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current scale-x-0 group-hover:scale-x-100 transform transition-transform ease-out duration-150 ${isActive("/guide") ? "scale-x-100" : ""}`}></span>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
