import React from "react";
import UpcomingEvents from "../events/upcomingEvents";

const UpcomingEventsList = () => {
  return (
    <div>
      <div className="flex justify-center space-x-[150px] mt-[20px]">
        <UpcomingEvents
          eventCoverImage="satefundraising"
          eventName="Sate Fundraising"
          eventDate={8}
          eventMonth="April"
          eventLocation="Illini Union"
          eventTime="11:00 am - 4:00 pm"
        />
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
  );
};

export default UpcomingEventsList;
