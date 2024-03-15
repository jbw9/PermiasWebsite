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
            <span className="text-4xl font-semibold">Join Our Family</span>
            <a
              href="https://www.google.com/forms/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              <div className="bg-footer rounded-full w-[200px] h-[50px] flex justify-center items-center">
                <span className="text-white">Click Here To Join</span>
              </div>
            </a>
          </div>
          <div className="flex flex-col items-center mt-[100px]">
            <span className="text-4xl font-semibold">Got Feedback?</span>
            <a
              href="https://www.google.com/forms/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4"
            >
              <div className="bg-footer rounded-full w-[200px] h-[50px] flex justify-center items-center">
                <span className="text-white">Leave a Message</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
