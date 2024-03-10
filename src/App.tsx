import React from "react";

// Components
import Header from "./Header";
import Footer from "./Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home";
import TeamPage from "./pages/Team";
import AboutUsPage from "./pages/AboutUs";
import EventPage from "./pages/Events";
import GuidePage from "./pages/Guide";
import MerchPage from "./pages/Merch";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/events" element={<EventPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/merch" element={<MerchPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
