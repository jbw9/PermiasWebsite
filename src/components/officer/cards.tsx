import React, { useState } from "react";
import { Officer } from "../../types";
import { getImageSrc } from "../../utils/imageSrc";

interface OfficerCardsProps {
  member: Officer;
  className?: string;
  onClick?: () => void;
}

const OfficerCards: React.FC<OfficerCardsProps> = ({
  member,
  className,
  onClick,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [imgError, setImgError] = useState(false);

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

  const hasImage = Boolean(member.image_url && !imgError);

  return (
    <div className="relative w-full">
      <div className={`${className}`}>
        <button onClick={handleCardClick} className="focus:outline-none">
          <div className="h-[550px] w-[340px]">
            <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 bg-gray-100">
              {hasImage ? (
                <img
                  src={getImageSrc(member.image_url)}
                  alt={member.name}
                  onError={() => setImgError(true)}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-400 text-lg font-medium">
                  {member.name}
                </div>
              )}
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
