import React, { useState } from "react";
import Popup2021 from "../components/merch/popup-2021";
import Popup2023 from "../components/merch/popup-2023";

const MerchPage: React.FC = () => {
  const [isPopup2021Open, setPopup2021Open] = useState(false);
  const [isPopup2023Open, setPopup2023Open] = useState(false);

  const openPopup2021 = () => {
    setPopup2021Open(true);
  };

  const closePopup2021 = () => {
    setPopup2021Open(false);
  };

  const openPopup2023 = () => {
    setPopup2023Open(true);
  };

  const closePopup2023 = () => {
    setPopup2023Open(false);
  };

  return (
    <div className="mb-[120px]">
      <div className="flex items-end justify-center w-full md:h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/merch/background.png"}
          alt="Background"
          className="object-cover w-full h-[300px] md:h-[600px]"
        />
      </div>
      <div className="flex items-center justify-center mt-10 text-4xl font-semibold text-red md:text-6xl">
        Merch
      </div>
      <div className="h-w-full mt-[50px] flex flex-col items-center px-4 md:px-[100px]">
        <div className="flex flex-col items-center md:flex-row md:justify-center">
          <button onClick={openPopup2021}>
            <div className="h-[500px] w-[370px] mb-8 md:h-[660px] md:w-[450px] md:mr-[200px] md:mb-0 bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 ring-1 ring-gray-200">
              <img
                src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
                alt="2021 hoodie"
                className="w-[280px] md:w-[450px]"
              />
              <span className="text-3xl md:text-4xl mt-[25px]">
                2021 Permias Hoodie
              </span>
              <span className="text-xl md:text-2xl">$20</span>
            </div>
          </button>
          <Popup2021 isOpen={isPopup2021Open} onClose={closePopup2021} />
          <button onClick={openPopup2023}>
            <div className="h-[500px] w-[370px] md:h-[660px] md:w-[450px] bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 ring-1 ring-gray-200">
              <img
                src={process.env.PUBLIC_URL + "/merch/2023_Hoodie_Main.png"}
                alt="2021 hoodie"
                className="w-[280px] md:w-[450px]"
              />
              <span className="text-3xl md:text-4xl mt-[25px]">
                2023 Permias Sweater
              </span>
              <span className="text-xl md:text-2xl">$25</span>
            </div>
          </button>
          <Popup2023 isOpen={isPopup2023Open} onClose={closePopup2023} />
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
