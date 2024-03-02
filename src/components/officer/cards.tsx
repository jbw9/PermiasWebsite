import React, { useState } from "react";
import Popup from "./card-popup";

// Define the props interface
interface OfficerCardsProps {
  member: {
    name: string;
    role: string;
    bio: string;
    image: string;
    funImage: string;
    instagram: string;
    linkedin: string;
    // ... any other properties you have
  };
}

// Modify the component to accept props
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
      <button onClick={openPopup}>
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
      {/* Pass the member prop to the Popup component */}
      <Popup isOpen={isPopupOpen} onClose={closePopup} member={member} />
    </div>
  );
};

export default OfficerCards;
