import React from "react";

const EventPage: React.FC = () => {
  return (
    <div>
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/events/main.jpg"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-5xl font-semibold">Upcoming Events</span>
        <div className="w-full h-[400px] bg-slate-500"></div>
        <span className="text-5xl font-semibold mt-[40px]">Past Events</span>
        <div className="w-full h-[400px] bg-slate-500"></div>
      </div>
    </div>
  );
};

export default EventPage;
