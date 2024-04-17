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
            eventCoverImage="gradnight"
            eventName="Grad Night"
            eventDate={10}
            eventMonth="May"
            eventLocation="Golden Harbor"
            eventTime="6:00 - 8:30 pm"
            eventrsvpLink="https://docs.google.com/forms/d/e/1FAIpQLScxf7T-pXP5Bm99UpfoWUlPNInGmutXnOvqcX3WhqJGkaDHFw/viewform"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
