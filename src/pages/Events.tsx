import React from "react";
import UpcomingEvents from "../components/events/upcomingEvents";
import Carousel from "../components/events/carousel";

const EventPage: React.FC = () => {
  const pasarmalamimages = [
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
    <div className="mb-[100px] overflow-hidden">
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/events/main.jpg"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="text-center mt-[50px]">
        <span className="text-5xl font-semibold">Our Upcoming Events</span>
        <div className="flex justify-center space-x-[250px] mt-[30px]">
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
        <div className="mt-[130px]">
          <span className="text-5xl font-semibold">Our Past Events</span>
          <div className="flex mt-[30px] mx-[140px] overflow-hidden">
            {/* Line and Circle container */}
            <div className="relative flex flex-col mr-[40px]">
              <div className="absolute w-[8px] bg-footer rounded-lg h-full ml-[8px]"></div>
              <div className="absolute w-6 h-6 rounded-full bg-footer mt-[11px]"></div>
            </div>

            {/* Text and Carousel container */}
            <div className="w-full">
              {/* Text container */}
              <div className="mb-[5px] mt-[5px] overflow-hidden items-start">
                <div className="flex text-3xl whitespace-nowrap">
                  Pasar Malam
                </div>
                <div className="flex text-xl whitespace-nowrap">
                  November 11, University YMCA
                </div>
                <div className="flex items-start text-lg">
                  "Pasar Malam" was a premier event of the past Fall semester,
                  featuring collaborations with RSOs like HKSA to offer a taste
                  of authentic Indonesian cuisine and traditional performances.
                </div>
              </div>

              {/* Carousel container */}
              <div className="overflow-hidden">
                <Carousel images={pasarmalamimages} />
              </div>
            </div>
          </div>
          <div className="flex mt-[30px] mx-[140px] overflow-hidden">
            {/* Line and Circle container */}
            <div className="relative flex flex-col mr-[40px]">
              <div className="absolute w-[8px] bg-footer rounded-lg h-full ml-[8px]"></div>
              <div className="absolute w-6 h-6 rounded-full bg-footer mt-[11px]"></div>
            </div>

            {/* Text and Carousel container */}
            <div className="w-full">
              {/* Text container */}
              <div className="mb-[5px] mt-[5px] overflow-hidden items-start">
                <div className="flex text-3xl whitespace-nowrap">
                  Pasar Malam
                </div>
                <div className="flex text-xl whitespace-nowrap">
                  November 11, University YMCA
                </div>
                <div className="flex items-start text-lg">
                  "Pasar Malam" was a premier event of the past Fall semester,
                  featuring collaborations with RSOs like HKSA to offer a taste
                  of authentic Indonesian cuisine and traditional performances.
                </div>
              </div>

              {/* Carousel container */}
              <div className="overflow-hidden">
                <Carousel images={pasarmalamimages} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
