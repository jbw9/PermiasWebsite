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
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
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
      <div className="flex items-end justify-center w-full md:h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/officers/teambg2024.png"}
          alt="Background"
          className="object-cover w-full h-[300px] md:h-[600px]"
        />
      </div>
      <div className="flex justify-center my-[40px] md:my-[75px]">
        <div>
          <span className="text-4xl font-semibold text-footer md:text-5xl">
            Meet{" "}
          </span>
          <span className="text-4xl font-bold text-red md:text-5xl">
            Our Officers
          </span>
        </div>
      </div>
      <div className="flex justify-center w-full h-full">
        <div className="w-full" ref={gridRef}>
          <div className="flex flex-wrap justify-center gap-y-14 gap-x-[120px]">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex justify-center p-4">
                <OfficerCards
                  member={member}
                  className="flex-grow opacity-0 officer-card"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
