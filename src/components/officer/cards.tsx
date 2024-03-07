import React, { useState } from "react";
import Popup from "./card-popup";

interface OfficerCardsProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    funImage: string;
    instagram: string;
    linkedin: string;
  };
}

const OfficerCards: React.FC<OfficerCardsProps> = ({ member }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <button onClick={openPopup} className="focus:outline-none">
        <div className="h-[550px] w-[340px]">
          <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={process.env.PUBLIC_URL + member.image}
              alt={member.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 text-center">
            <span className="block text-2xl">{member.name}</span>
            <span className="block">{member.role}</span>
          </div>
        </div>
      </button>
      <Popup isOpen={isPopupOpen} onClose={closePopup} member={member} />
    </div>
  );
};

export default OfficerCards;

{
  /* transform transition duration-300 ease-in-out hover:scale-105 */
}
