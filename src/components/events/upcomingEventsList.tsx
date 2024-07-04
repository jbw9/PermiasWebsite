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
            eventCoverImage="irlMeetGreet"
            eventName="2024 Meet & Greet"
            eventDate={20}
            eventMonth="July"
            eventLocation="Gedung Munik Restoran"
            eventTime="TBD"
            eventrsvpLink="https://docs.google.com/forms/d/e/1FAIpQLSeStvXVdtY6Djh8IyChbo9BaY-1Vt2NBZcUcuQz_Donqs3Avw/viewform"
          />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default UpcomingEventsList;
