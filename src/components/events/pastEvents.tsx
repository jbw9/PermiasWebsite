import Carousel from "../events/carousel";
import { pastEvents, PastEvent } from "../../data/past_events";

const PastEvents = () => {
  return (
    <div>
      {pastEvents.map((event: PastEvent) => (
        <div className="mb-[100px]">
          <div className="relative flex flex-col mr-[40px]">
            <div className="absolute w-6 h-6 rounded-full bg-red mt-[11px]"></div>
          </div>
          <div key={event.name} className="w-full ml-[40px]">
            <div className="mb-[5px] mt-[5px] items-start">
              <div className="flex text-3xl whitespace-nowrap">
                {event.name}
              </div>
              <div className="flex text-xl whitespace-nowrap">{event.date}</div>
            </div>
            <div className="overflow-hidden">
              <Carousel images={event.images} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastEvents;
