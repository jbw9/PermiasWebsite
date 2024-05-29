import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo";
import { Link } from "react-router-dom";
import BgVidIcons from "../components/home/backgroundVideoIcons";
import AboutCommunity from "../components/home/aboutCommunity";
import OurPurpose from "../components/home/ourPurpose";
import FreshmanSpotlight from "../components/home/freshmanSpotlight";
import GetInvolved from "../components/home/getInvolved";
import UpcomingEventsList from "../components/events/upcomingEventsList";
import { Helmet } from "react-helmet";
import GraduateSpotlight from "../components/home/graduateSpotlight";

const WebsiteTitle: React.FC = () => {
  return (
    <div className="relative flex justify-center h-full">
      <div className="mt-[50px] flex flex-col">
        <span className="text-5xl font-bold md:text-7xl">PERMIAS UIUC</span>
        <span className="md:text-xl mt-[10px]">
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
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Learn more about Permias UIUC, our mission, history, and how we connect Indonesian culture with UIUC"
        />
        <title>Permias UIUC</title>
      </Helmet>
      <div className="mb-[100px] w-full overflow-x-hidden">
        <div>
          <BackgroundVideo
            source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"}
            children={<WebsiteTitle />}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <div className="w-full mt-[70px] md:mt-[120px] flex flex-col items-center px-[30px] md:px-[150px]">
            <AboutCommunity />
            <div className="mt-[100px] text-center w-full">
              <div>
                <span className="text-4xl font-semibold md:text-5xl text-footer">
                  Upcoming{" "}
                </span>
                <span className="text-4xl font-bold md:text-5xl text-red">
                  Events
                </span>
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
            <div className="mt-[140px] md:mx-[150px] mx-[20px]">
              <FreshmanSpotlight />
            </div>
            <div className="mt-[140px] md:mx-[150px] mx-[20px]">
              <GraduateSpotlight />
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
