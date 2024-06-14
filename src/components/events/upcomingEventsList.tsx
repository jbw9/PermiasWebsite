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
            eventCoverImage="meetgreet"
            eventName="2024 Meet & Greet"
            eventDate={22}
            eventMonth="June"
            eventLocation="Online (Zoom)"
            eventTime="11:00am - End WIB"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
