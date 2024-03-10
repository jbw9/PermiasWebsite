import React from "react";
import UpcomingEvents from "../components/events/upcomingEvents";

const EventPage: React.FC = () => {
  return (
    <div className="mb-[100px]">
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/events/main.jpg"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center mt-[50px]">
        <span className="text-5xl font-semibold">Our Upcoming Events</span>
        <div className="flex justify-center space-x-[250px] mt-[20px]">
          <UpcomingEvents
            eventCoverImage="gradnight"
            eventName="Grad Night"
            eventDate={10}
            eventMonth="May"
            eventLocation="Illini Union"
            eventTime="7:00 - 9:00 pm"
            eventrsvpLink="https://www.google.com/forms/about/"
          />
          <UpcomingEvents
            eventCoverImage="satefundraising"
            eventName="Sate Fundraising"
            eventDate={8}
            eventMonth="April"
            eventLocation="Illini Union"
            eventTime="1:00 - 3:00 pm"
            eventrsvpLink="https://www.google.com/forms/about/"
          />
        </div>
        <div className="mt-[100px]">
          <span className="text-5xl font-semibold">Our Past Events</span>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
