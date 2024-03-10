import React from "react";
import UpcomingEvents from "../components/events/upcomingEvents";
import Carousel from "../components/events/carousel";

const EventPage: React.FC = () => {
  const images = [
    process.env.PUBLIC_URL + "/events/pasmal_2023/one.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/two.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/three.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/four.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/five.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/six.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/seven.jpg",
    process.env.PUBLIC_URL + "/events/pasmal_2023/eight.jpg",
    // You can add more images here
  ];
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
          <Carousel images={images} />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
