import React from "react";
import OfficerCards from "../components/officer/cards";
import { TeamMember, teamMembers } from "../data/team_members";

const TeamPage: React.FC = () => {
  return (
    <div>
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/officers/background.JPG"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-center my-[75px]">
        <h1 className="text-6xl font-semibold">Meet Our Officers</h1>
      </div>
      <div className="h-[1000px] w-full flex justify-center mt-[50px]">
        <div className="w-[80%]">
          <div className="grid grid-cols-3 gap-y-14 justify-items-center">
            {teamMembers.map((member, index) => (
              <OfficerCards key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
