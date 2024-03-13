import React, { useEffect, useRef } from "react";
import OfficerCards from "../components/officer/cards";
import { teamMembers } from "../data/team_members";

const TeamPage: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          } else {
            // Optional: Uncomment the following line if you want to re-trigger the animation
            // entry.target.classList.remove("animate-fadeIn");
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Adjust this value based on your needs
      }
    );

    const cards = gridRef.current?.querySelectorAll(".officer-card");

    cards?.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      cards?.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div className="mb-[70px]">
      <div className="flex items-end justify-center w-full h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/officers/background.png"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-center my-[75px]">
        <h1 className="text-6xl font-semibold">Meet Our Officers</h1>
      </div>
      <div className="h-full w-full flex justify-center mt-[50px]">
        <div className="w-[80%]" ref={gridRef}>
          <div className="grid grid-cols-3 gap-y-14 justify-items-center">
            {teamMembers.map((member, index) => (
              <OfficerCards
                key={index}
                member={member}
                className="opacity-0 officer-card"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
