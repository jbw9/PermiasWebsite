import React from "react";
import Carousel from "../events/carousel";
import { pastEvents, PastEvent } from "../../data/past_events";

const PastEvents = () => {
  return (
    <div>
      {pastEvents.map((event: PastEvent, index: number) => (
        <div className="md:mb-[100px] mb-[10px]" key={event.name}>
          <div className="relative flex flex-col mr-[40px]">
            <div className="absolute w-6 h-6 rounded-full bg-red mt-[11px] hidden md:block"></div>
          </div>
          <div className="w-full md:ml-[40px]">
            <div className="mb-[5px] mt-[5px] items-start">
              <div className="flex text-xl break-words md:text-3xl">
                {event.name}
              </div>
              <div className="flex text-lg break-words md:text-xl">
                {event.date}
              </div>
            </div>
            <div className="overflow-hidden">
              <Carousel
                images={event.images}
                direction={index % 2 === 0 ? "right" : "left"}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastEvents;
