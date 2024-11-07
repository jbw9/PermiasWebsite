import React from "react";
import UpcomingEvents from "../events/upcomingEvents";

const UpcomingEventsList = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-8 md:space-x-12 lg:space-x-[150px] mt-[20px]">
        <div className="w-full sm:w-auto">
          {/* <UpcomingEvents
            eventCoverImage="pasmal2024"
            eventName="Pasar Malam 2024"
            eventDate={2}
            eventMonth="Nov"
            eventLocation="YMCA, Latzer hall"
            eventTime="5 - 9pm"
          /> */}
        </div>
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
