import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
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
        <Link to="/" className="mx-2 text-2xl font-semibold">
          Home
        </Link>
        <Link to="/about-us" className="mx-2 text-2xl font-semibold">
          About Us
        </Link>
        <Link to="/team" className="mx-2 text-2xl font-semibold">
          Team
        </Link>
        <Link to="/events" className="mx-2 text-2xl font-semibold">
          Events
        </Link>
        <Link to="/merch" className="mx-2 text-2xl font-semibold">
          Merch
        </Link>
        <Link to="/guide" className="mx-2 text-2xl font-semibold">
          Guide
        </Link>
      </nav>
    </div>
  );
};

export default Header;
