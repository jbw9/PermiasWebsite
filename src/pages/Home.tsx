import React, { useState, useEffect } from "react";
import BackgroundVideo from "../components/home/backgroundvideo";
import { Link } from "react-router-dom";
import BgVidIcons from "../components/home/backgroundVideoIcons";
import AboutCommunity from "../components/home/aboutCommunity";
import OurPurpose from "../components/home/ourPurpose";
import FreshmanSpotlight from "../components/home/freshmanSpotlight";
import GetInvolved from "../components/home/getInvolved";
import UpcomingEventsList from "../components/events/upcomingEventsList";

const WebsiteTitle: React.FC = () => {
  return (
    <div className="relative flex justify-center h-full">
      <div className="mt-[80px] flex flex-col">
        <span className="font-bold text-7xl">PERMIAS UIUC</span>
        <span className="text-xl mt-[10px]">
          Welcome to Our Official Website
        </span>
      </div>
      <div className="absolute bottom-0 flex justify-center items-center h-[100px] w-[200px] mb-[10px]">
        <BgVidIcons />
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(window.innerWidth < 768);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <div className="mb-[100px] w-full overflow-x-hidden">
        {showAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-red text-white p-4 rounded-2xl w-[300px] text-center">
              <button
                onClick={handleCloseAlert}
                className="absolute text-xl font-bold top-2 right-2"
              >
                ✕
              </button>
              <p>
                Sorry, this website is not optimized for mobile viewing yet.
                Please toggle the desktop site mode or open it on your
                laptop/desktop.
              </p>
            </div>
          </div>
        )}

        <div>
          <BackgroundVideo
            source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"}
            children={<WebsiteTitle />}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full mt-[120px] flex flex-col items-center px-[150px]">
            <AboutCommunity />
            <div className="mt-[100px] text-center w-full">
              <div>
                <span className="text-5xl font-semibold text-footer">
                  Upcoming{" "}
                </span>
                <span className="text-5xl font-bold text-red">Events</span>
              </div>
              <div>
                <UpcomingEventsList />
              </div>
              <div className="mt-[20px] flex justify-center">
                <Link to="/events" className="inline-block mb-4">
                  <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                    <span className="text-white">View Past Events</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt-[100px]">
              <OurPurpose />
            </div>
            <div className="mt-[140px] mx-[150px]">
              <FreshmanSpotlight />
            </div>
            <div className="mt-[120px]">
              <GetInvolved />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
