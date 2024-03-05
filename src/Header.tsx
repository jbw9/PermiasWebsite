import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import TeamPage from "./pages/Team";
import AboutUsPage from "./pages/AboutUs";
import EventPage from "./pages/Events";
import GuidePage from "./pages/Guide";
import MerchPage from "./pages/Merch";
import NotFound from "./pages/NotFound";

const Header: React.FC = () => {
  return (
    <Router>
      <div className="flex items-center justify-between w-full p-2 mx-auto bg-">
        <Link to="/">
          <img
            src={process.env.PUBLIC_URL + "/mainLogo.png"}
            alt="PERMIAS LOGO"
            width={250}
          />
        </Link>
        <div className="">
          <nav className="flex items-center ml-4">
            <Link to="/">
              <div className="mx-2 text-2xl font-semibold">Home</div>
            </Link>
            <Link to="/about-us">
              <div className="mx-2 text-2xl font-semibold">About Us</div>
            </Link>
            <Link to="/team">
              <div className="mx-2 text-2xl font-semibold">Team</div>
            </Link>
            <Link to="/events">
              <div className="mx-2 text-2xl font-semibold">Events</div>
            </Link>
            <Link to="/merch">
              <div className="mx-2 text-2xl font-semibold">Merch</div>
            </Link>
            <Link to="/guide">
              <div className="mx-2 text-2xl font-semibold">Guide</div>
            </Link>
          </nav>
        </div>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Header;
