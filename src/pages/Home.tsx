import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo";
import UpcomingEvents from "../components/events/upcomingEvents";
import { Link } from "react-router-dom";
import BgVidIcons from "../components/home/backgroundVideoIcons";
import AboutCommunity from "../components/home/aboutCommunity";
import OurPurpose from "../components/home/ourPurpose";

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
  return (
    <div className="mb-[100px]">
      <div className="">
        <BackgroundVideo
          source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"}
          children={<WebsiteTitle />}
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full mt-[100px] flex flex-col items-center px-[150px]">
          <AboutCommunity />
          <div className="mt-[100px] text-center w-full">
            <div>
              <span className="text-5xl font-semibold text-footer">
                Upcoming{" "}
              </span>
              <span className="text-5xl font-bold text-red">Events</span>
            </div>
            <div className="flex justify-center space-x-[150px] mt-[20px]">
              <UpcomingEvents
                eventCoverImage="buka_bersama"
                eventName="Buka Bersama"
                eventDate={28}
                eventMonth="March"
                eventLocation="Orchard Downs"
                eventTime="5:00 - 8:30 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              />
              {/* <UpcomingEvents
                eventCoverImage="satefundraising"
                eventName="Sate Fundraising"
                eventDate={8}
                eventMonth="April"
                eventLocation="Illini Union"
                eventTime="1:00 - 3:00 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              /> */}
              <UpcomingEvents
                eventCoverImage="gradnight"
                eventName="Grad Night"
                eventDate={10}
                eventMonth="May"
                eventLocation="Illini Union"
                eventTime="7:00 - 9:00 pm"
                eventrsvpLink="https://www.google.com/forms/about/"
              />
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
          <div className="flex flex-col items-center mt-[100px]">
            <div className="container px-4 mx-auto">
              <div className="mb-8 text-center">
                <span className="text-5xl font-semibold text-footer">Get </span>
                <span className="text-5xl font-bold text-red">Involved</span>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mb-4"
                  >
                    <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                      <span className="text-white">Join Our Family</span>
                    </div>
                  </a>

                  <p className="text-gray-600">
                    Become a part of our community
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mb-4"
                  >
                    <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                      <span className="text-white">Leave a Message</span>
                    </div>
                  </a>
                  <p className="text-gray-600">
                    Share your thoughts and suggestions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
