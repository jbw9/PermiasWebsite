import React from "react";
import UpcomingEvents from "../components/events/upcomingEvents";
import PastEvents from "../components/events/pastEvents";
import UpcomingEventsList from "../components/events/upcomingEventsList";

const EventPage: React.FC = () => {
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
        <div>
          <span className="text-5xl font-semibold text-footer">Upcoming </span>
          <span className="text-5xl font-bold text-red">Events</span>
        </div>
        <div>
          <UpcomingEventsList />
        </div>
        <div className="mt-[130px]">
          <div>
            <span className="text-5xl font-semibold text-footer">Past </span>
            <span className="text-5xl font-bold text-red">Events</span>
          </div>
          <div className="flex mt-[30px] mx-[170px] overflow-hidden">
            <div className="absolute w-[8px] bg-red rounded-lg h-[2800px] ml-[8px]"></div>
            <div className="">
              <PastEvents />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
