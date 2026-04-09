import React, { useState } from "react";
import { Officer } from "../../types";

interface OfficerCardsProps {
  member: Officer;
  className?: string;
  onClick?: () => void;
}

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

const OfficerCards: React.FC<OfficerCardsProps> = ({ member, className, onClick }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = () => {
    if (member.name.toLowerCase() === "evan m. huang") {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      if (newCount % 5 === 0) {
        window.open(
          "https://drive.google.com/file/d/1hopDUtOAdBjp5KGqPaxW4ECdMptj1M5O/view?usp=sharing"
        );
      }
    }
    onClick?.();
  };

  return (
    <div className="relative w-full">
      <div className={`${className}`}>
        <button onClick={handleCardClick} className="focus:outline-none">
          <div className="h-[550px] w-[340px]">
            <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl transform transition duration-300 ease-in-out hover:scale-105">
              <img
                src={getImageSrc(member.image_url)}
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
    </div>
  );
};

export default OfficerCards;
