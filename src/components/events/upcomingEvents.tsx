interface UpcomingEventsProps {
  eventCoverImage: string;
  eventName: string;
  eventMonth: string;
  eventDate: string | number;
  eventTime: string;
  eventLocation: string;
  eventrsvpLink?: string;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ eventCoverImage, eventName, eventMonth, eventDate, eventTime, eventLocation, eventrsvpLink }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-[20px]">
        <div className="w-[400px] h-[400px] rounded-2xl shadow-2xl relative overflow-hidden text-white">
          <img src={`${process.env.PUBLIC_URL}/events/${eventCoverImage}.png`} alt={eventName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div
            className="absolute bottom-0 left-0 w-full p-4"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div className="flex items-center justify-between h-[60px] w-full p-[5px]">
              <div className="flex items-center">
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-xl">{eventMonth}</span>
                  <span>{eventDate}</span>
                </div>
                <div className="w-[2px] h-[50px] bg-white mx-[7px]"></div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center mb-1">
                    <img src={process.env.PUBLIC_URL + "/events/clock.png"} alt="Time Icon" className="w-5 h-5 mr-2" />
                    <span>{eventTime}</span>
                  </div>
                  <div className="flex items-center">
                    <img src={process.env.PUBLIC_URL + "/events/location.png"} alt="Location Icon" className="w-5 h-5 mr-2" />
                    <span>{eventLocation}</span>
                  </div>
                </div>
              </div>
              {eventrsvpLink && (
                <a href={eventrsvpLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <div className="w-[100px] h-[40px] rounded-2xl border border-gray-400 flex items-center justify-center">
                    <span className="text-xl">RSVP</span>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
        <span className="text-2xl mt-[10px]">{eventName}</span>
      </div>
    </div>
  );
};

export default UpcomingEvents;
