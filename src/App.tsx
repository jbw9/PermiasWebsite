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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageViewTracker />
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/team"
          element={
            <DefaultLayout>
              <TeamPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/about-us"
          element={
            <DefaultLayout>
              <AboutUsPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/events"
          element={
            <DefaultLayout>
              <EventPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/guide"
          element={
            <DefaultLayout>
              <GuidePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <DefaultLayout>
              <ContactPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <NotFound />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
