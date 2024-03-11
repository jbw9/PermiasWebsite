import React, { useState } from "react";
import Popup2023 from "../components/merch/popup-2023";

const MerchPage: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return (
    <div className="mb-[120px]">
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/merch/background.png"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex items-center justify-center mt-10 text-6xl font-semibold">
        Merch
      </div>
      <div className="h-w-full mt-[50px] flex flex-col items-center px-[100px]">
        <div className="flex">
          <button onClick={openPopup}>
            <div className="h-[660px] w-[450px] mr-[200px] bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
                alt="2021 hoodie"
                width={450}
              />
              <span className="text-4xl mt-[25px]">2021 Permias Hoodie</span>
              <span className="text-2xl">$25</span>
            </div>
          </button>
          <Popup2023 isOpen={isPopupOpen} onClose={closePopup} />
          <div className="h-[660px] w-[450px] bg-merchbg rounded-2xl shadow-2xl flex flex-col justify-center items-center">
            <img
              src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
              alt="2021 hoodie"
              width={450}
            />
            <span className="text-4xl mt-[25px]">2023 Permias Hoodie</span>
            <span className="text-2xl">$25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
