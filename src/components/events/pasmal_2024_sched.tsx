import React from "react";

const Pasmal2024Sched = () => {
  const schedule = [
    {
      time: "5:00pm",
      event: "Doors Open - Welcome to PASMAL 2024!",
      description: "Join us as we begin our evening of cultural celebration",
    },
    {
      time: "5:30pm",
      event: "Welcome Ceremony",
      description:
        "Opening remarks from our distinguished guests and organizers",
    },
    {
      time: "6:00pm",
      event: "Opening Performance",
      description: "Kick off the evening with our first cultural showcase",
    },
    {
      time: "6:15pm",
      event: "Cultural Performances",
      description:
        "Experience diverse cultural presentations from our community",
    },
    {
      time: "6:30pm",
      event: "Special Video Presentation",
      description: "Watch our featured presentation highlighting our community",
    },
    {
      time: "6:35pm",
      event: "Traditional Indonesian Performance",
      description:
        "Featured performances including Wayang (Shadow Puppet) and Drama",
    },
    {
      time: "6:50pm",
      event: "Tari Saman Performance",
      description: "Traditional Indonesian dance showcase",
    },
    {
      time: "7:00pm",
      event: "Dance Floor Open",
      description: "Join us for community dancing and celebration",
    },
    {
      time: "7:20pm",
      event: "Interactive Quiz Game",
      description: "Test your knowledge and win prizes!",
    },
    {
      time: "7:40pm",
      event: "Final Performances",
      description: "Enjoy our closing cultural showcases",
    },
    {
      time: "7:50pm",
      event: "Closing Ceremony",
      description: "Final remarks and group photo",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl p-6 mx-auto">
      <div className="w-full space-y-4">
        {schedule.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center p-4 transition-shadow duration-300 bg-white shadow-lg md:flex-row rounded-xl ring-1 ring-gray-200 hover:shadow-xl"
          >
            <div className="items-center h-full mb-2 md:w-1/4 md:mb-0">
              <span className="text-xl font-semibold text-red">
                {item.time}
              </span>
            </div>
            <div className="md:w-3/4">
              <h3 className="mb-1 text-xl font-semibold text-footer">
                {item.event}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pasmal2024Sched;
