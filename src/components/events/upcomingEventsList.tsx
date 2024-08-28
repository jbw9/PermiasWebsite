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
          <UpcomingEvents
            eventCoverImage="meetmingle"
            eventName="Mingle & Connect"
            eventDate={31}
            eventMonth="Aug"
            eventLocation="Scott Park"
            eventTime="10.30 - 2pm"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
