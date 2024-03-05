const UpcomingEvents = () => {
  return (
    <div>
      <div className="flex flex-col w-[1000px] h-[500px] mt-[20px] items-center justify-center space-x-[40px]">
        <span className="text-3xl mb-[10px]"> Grad Night</span>
        <div className="w-[400px] h-[400px] rounded-2xl shadow-2xl relative overflow-hidden text-white">
          <img
            src={process.env.PUBLIC_URL + "/events/gradnight.png"}
            alt="grad night"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            className="absolute bottom-0 left-0 w-full p-4"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <div className="flex items-center justify-between h-[60px] w-full  p-[5px]">
              <div className="flex items-center">
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-xl">May</span>
                  <span>10</span>
                </div>
                <div className="w-[2px] h-[50px] bg-white mx-[7px]"></div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center mb-1">
                    <img
                      src={process.env.PUBLIC_URL + "/events/clock.png"}
                      alt="Time Icon"
                      className="w-5 h-5 mr-2"
                    />
                    <span>7:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <img
                      src={process.env.PUBLIC_URL + "/events/location.png"}
                      alt="Location Icon"
                      className="w-5 h-5 mr-2"
                    />
                    <span>Illini Union</span>
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/forms/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <div className="w-[100px] h-[40px] rounded-2xl border border-gray-400 flex items-center justify-center">
                  <span className="text-xl">RSVP</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
