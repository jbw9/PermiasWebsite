import React from "react";
import UpcomingEvents from "../events/upcomingEvents";

const UpcomingEventsList = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-8 md:space-x-12 lg:space-x-[150px] mt-[20px]">
        {" "}
        <div className="w-full sm:w-auto">
          {" "}
          <UpcomingEvents eventCoverImage="satefundraising" eventName="Sate Fundraising" eventDate={8} eventMonth="April" eventLocation="Illini Union" eventTime="11:00 am - 4:00 pm" />{" "}
        </div>{" "}
        <div className="w-full sm:w-auto">
          {" "}
          <UpcomingEvents eventCoverImage="gradnight" eventName="Grad Night" eventDate={10} eventMonth="May" eventLocation="Illini Union" eventTime="7:00 - 9:00 pm" eventrsvpLink="https://www.google.com/forms/about/" />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
