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
        <Router>
            <div className="flex w-full items-center mx-auto justify-between p-2 bg-">
                <img 
                    src={ process.env.PUBLIC_URL + "/mainLogo.png"}
                    alt="PERMIAS LOGO"
                    width={200}
                />
                <div className="">
                    <nav className="ml-4 flex items-center">
                        <Link to="/">
                            <div className="mx-2 font-semibold">
                                Home
                            </div>
                        </Link>
                        <Link to="/team">
                            <div className="mx-2 font-semibold">
                                Team
                            </div>
                        </Link>
                        <Link to="/about-us">
                            <div className="mx-2 font-semibold">
                                About Us
                            </div>
                        </Link>
                    </nav>
                </div>
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
    )
}

export default Header