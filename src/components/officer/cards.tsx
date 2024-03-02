import React, { useState } from "react";
import Popup from "./card-popup";

const OfficerCards = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup}>
        <div className="h-[550px] w-[340px]">
          <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={process.env.PUBLIC_URL + "/officers/aisha.JPG"}
              alt="Officer"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 text-center">
            <span className="block text-2xl">Aisha Tanjung</span>
            <span className="block">President</span>
          </div>
        </div>
      </button>
      <Popup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default OfficerCards;
