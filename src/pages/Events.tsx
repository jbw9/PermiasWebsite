import React from "react";
import PastEvents from "../components/events/pastEvents";
import UpcomingEventsList from "../components/events/upcomingEventsList";

const EventPage: React.FC = () => {
  return (
    <div className="mb-[100px] overflow-hidden">
      <div className="flex items-end justify-center w-full md:h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/events/main.jpg"}
          alt="Background"
          className="object-cover w-full h-[300px] md:h-[600px]"
        />
      </div>
      <div className="text-center mt-[50px]">
        <div>
          <span className="text-4xl font-semibold md:text-5xl text-footer">
            Upcoming{" "}
          </span>
          <span className="text-4xl font-bold md:text-5xl text-red">
            Events
          </span>
        </div>
        <div>
          <UpcomingEventsList />
        </div>
        <div className="mt-[130px]">
          <div>
            <span className="text-4xl font-semibold md:text-5xl text-footer">
              Past{" "}
            </span>
            <span className="text-4xl font-bold md:text-5xl text-red">
              Events
            </span>
          </div>
          <div className="flex mt-[30px] md:mx-[170px] overflow-hidden mx-[30px]">
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
