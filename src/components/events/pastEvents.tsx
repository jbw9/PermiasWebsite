import Carousel from "../events/carousel";

const PastEvents = () => {
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
    <div className="mb-[35px]">
      <div className="relative flex flex-col mr-[40px]">
        <div className="absolute w-6 h-6 rounded-full bg-footer mt-[11px]"></div>
      </div>
      <div className="w-full ml-[40px]">
        <div className="mb-[5px] mt-[5px] items-start">
          <div className="flex text-3xl whitespace-nowrap">Pasar Malam</div>
          <div className="flex text-xl whitespace-nowrap">
            November 11, University YMCA
          </div>
          <div className="flex items-start text-lg">
            "Pasar Malam" was a premier event of the past Fall semester,
            featuring collaborations with RSOs like HKSA to offer a taste of
            authentic Indonesian cuisine and traditional performances.
          </div>
        </div>
        <div className="overflow-hidden">
          <Carousel images={pasarmalamimages} />
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
