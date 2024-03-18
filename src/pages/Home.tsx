import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo";
import UpcomingEvents from "../components/events/upcomingEvents";

const WebsiteTitle: React.FC = () => {
  return (
    <div className="relative flex justify-center h-full">
      <div className="text-7xl mt-[80px]">PERMIAS UIUC</div>
      <div className="absolute bottom-0 flex justify-center items-center h-[100px] w-[200px] mb-[10px]">
        <div className="flex">
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
              alt="Whatsapp Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.instagram.com/permiasuiuc/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/instagram.svg"}
              alt="Instagram Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fisc.uiuc%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/facebook.svg"}
              alt="Facebook Logo"
              width={50}
              className="mx-10"
            />
          </a>
        </div>
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
      <div className="flex mx-[150px] mt-[100px] justify-center items-center">
        <div className="flex items-center w-[40%]">
          <span className="font-bold text-7xl">
            Welcome to the official PERMIAS University of Illinois at
            Urbana-Champaign Website
          </span>
        </div>
        <div className="flex justify-end w-1/2">
          <img
            className=""
            src={process.env.PUBLIC_URL + "/Home/largelogo.png"}
            alt=""
            height={400}
            width={550}
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full">
        <div className="w-full mt-[50px] flex flex-col items-center px-[150px]">
          <div className="mt-[0px] text-center w-full">
            <span className="text-4xl font-semibold">Upcoming Events</span>
            <div className="flex justify-center space-x-[150px] mt-[30px]">
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
          </div>
          <div className="flex flex-col items-center mt-[100px]">
            <div className="container px-4 mx-auto">
              <h2 className="mb-8 text-4xl font-semibold text-center">
                Get Involved
              </h2>
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center">
                  <a
                    href="https://www.google.com/forms/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-4"
                  >
                    <div className="bg-footer rounded-full w-[200px] h-[50px] flex justify-center items-center">
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
                    className="mb-4"
                  >
                    <div className="bg-footer rounded-full w-[200px] h-[50px] flex justify-center items-center">
                      <span className="text-white">Leave Feedback</span>
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
