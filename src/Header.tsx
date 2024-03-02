import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import TeamPage from "./pages/Team";
import AboutUsPage from "./pages/AboutUs";
import NotFound from "./pages/NotFound";


const Header: React.FC = () => {
    return (
        <header>
            <Router>
                <div className="flex">
                    <img 
                        src={ process.env.PUBLIC_URL + "/mainLogo.png"}
                        alt="PERMIAS LOGO"
                        width={200}
                    />
                    <nav>
                        <Link to="/">  Home  </Link>
                        <Link to="/team">  Team  </Link>
                        <Link to="/about-us">  About Us  </Link>
                    </nav>
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/about-us" element={<AboutUsPage />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </div>
            </Router>
        </header>
    )
}

export default Header