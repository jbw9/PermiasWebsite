import React from "react";
import UpcomingEvents from "../events/upcomingEvents";

const UpcomingEventsList = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-8 md:space-x-12 lg:space-x-[150px] mt-[20px]">
        <div className="w-full sm:w-auto">
          <UpcomingEvents
            eventCoverImage="pietheofficer2024"
            eventName="Pie The Officer"
            eventDate={12}
            eventMonth="Oct"
            eventLocation="Main Quad"
            eventTime="12.00 - 2.00pm"
            eventrsvpLink="https://forms.gle/VFVh5ZMfseg8EKsm8"
          />
        </div>
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
