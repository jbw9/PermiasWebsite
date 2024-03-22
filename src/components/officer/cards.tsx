import React, { useState, useEffect } from "react";
import Popup from "./card-popup"; // Update the import path according to your file structure

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
  className?: string;
}

const OfficerCards: React.FC<OfficerCardsProps> = ({ member, className }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isPopupOpen]);

  return (
    <div className="relative w-full">
      <div className={`${className}`}>
        <button onClick={openPopup} className="focus:outline-none">
          <div className="h-[550px] w-[340px]">
            <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src={process.env.PUBLIC_URL + member.image}
                alt={member.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4 text-center">
              <span className="block text-2xl font-semibold">
                {member.name}
              </span>
              <span className="block text-md text-red">{member.role}</span>
            </div>
          </div>
        </button>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup} member={member} />
    </div>
  );
};

export default OfficerCards;
