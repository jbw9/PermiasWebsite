import React from "react";
import { 
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="flex">
            <div>
                <img 
                    src={ process.env.PUBLIC_URL + "/mainLogo.png"}
                    alt="PERMIAS LOGO"
                    width={200}
                />
            </div>
            <div className="flex">
                <span>Home</span>
                <span>Team</span>
                <span>About Us</span>
            </div>
        </header>
    )
}

export default Header