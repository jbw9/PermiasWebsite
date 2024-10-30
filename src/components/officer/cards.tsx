import React, { useState } from "react";

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
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = () => {
    if (member.name.toLowerCase() === "evan m. huang") {
      const newCount = clickCount + 1;
      setClickCount(newCount);

      if (newCount === 5) {
        window.open(
          "https://drive.google.com/file/d/17DLQPO12FTMVFJtFtXic4oJS8NHzMVm3/view?usp=sharing"
        );
      }
    }
  };

  return (
    <div className="relative w-full">
      <div className={`${className}`}>
        <button onClick={handleCardClick} className="focus:outline-none">
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
    </div>
  );
};

export default OfficerCards;
