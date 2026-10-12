import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import DefaultLayout from "./DefaultLayout";
import PageViewTracker from "./components/PageViewTracker";

import HomePage from "./pages/Home";
import TeamPage from "./pages/Team";
import AboutUsPage from "./pages/AboutUs";
import EventPage from "./pages/Events";
import GuidePage from "./pages/Guide";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/Contact";
import AdminPage from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const PAGES = [
  { path: "/", element: <HomePage /> },
  { path: "/team", element: <TeamPage /> },
  { path: "/about-us", element: <AboutUsPage /> },
  { path: "/events", element: <EventPage /> },
  { path: "/guide", element: <GuidePage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/*", element: <NotFound /> },
];

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        {PAGES.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<DefaultLayout>{element}</DefaultLayout>}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
