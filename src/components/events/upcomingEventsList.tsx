import React from "react";
import UpcomingEvents from "../events/upcomingEvents";

const UpcomingEventsList = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-8 md:space-x-12 lg:space-x-[150px] mt-[20px]">
        <div className="w-full sm:w-auto">
          <UpcomingEvents
            eventCoverImage="pandji"
            eventName="Friday Funnies - Pandji"
            eventDate={18}
            eventMonth="Oct"
            eventLocation="Courtyard Cafe, Illini Union"
            eventTime="7.00pm"
          />
        </div>
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
