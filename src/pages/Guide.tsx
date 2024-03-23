import React, { useState } from "react";
import Transport from "../components/guide/card-popup";

const GuidePage: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <span className="justify-center mt-10 text-5xl font-semibold text-center">
          Our Guide To
        </span>
        <span className="justify-center text-5xl font-bold text-center text-red">
          Urbana-Champaign
        </span>
      </div>
      <div className="flex flex-row justify-center space-x-[150px]">
        <div className="">
          <button onClick={openPopup}>
            <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 ring-1 ring-gray-200">
              <img
                className="mt-[70px]"
                src={process.env.PUBLIC_URL + "/Home/friendship.png"}
                alt=""
                height={175}
                width={175}
              />
              <div className="mt-[60px] flex flex-col items-center mx-[40px]">
                <span className="text-4xl font-semibold text-center text-footer">
                  Friendship
                </span>
                <div className="w-full mt-4 text-lg">
                  Forge friendships with peers sharing your culture, building
                  enduring connections that extend beyond university life.
                </div>
              </div>
            </div>
          </button>
          <Transport isOpen={isPopupOpen} onClose={closePopup} />
        </div>
        <div className="">
          <button onClick={openPopup}>
            <div className="h-[660px] w-[450px] mr-[0px] bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 ring-1 ring-gray-200">
              <img
                src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
                alt="2021 hoodie"
                width={450}
              />
              <span className="text-4xl mt-[25px]">Transportation</span>
              <span className="text-2xl">
                Find out transportaion information to get to and around campus!
              </span>
            </div>
          </button>
          <Transport isOpen={isPopupOpen} onClose={closePopup} />
        </div>
        <div className="">
          <button onClick={openPopup}>
            <div className="h-[660px] w-[450px] mr-[0px] bg-white rounded-2xl shadow-2xl flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 ring-1 ring-gray-200">
              <img
                src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
                alt="2021 hoodie"
                width={450}
              />
              <span className="text-4xl mt-[25px]">Transportation</span>
              <span className="text-2xl">
                Find out transportaion information to get to and around campus!
              </span>
            </div>
          </button>
          <Transport isOpen={isPopupOpen} onClose={closePopup} />
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
