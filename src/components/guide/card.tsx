import React from "react";

interface GuideCardProps {
    imagePath: string;
    title: string;
    pros: string[];
    cons: string[];
  }

const GuideCard: React.FC<GuideCardProps> = ({ imagePath, title, pros, cons }) => {
  return (
    <div>
        <div className="text-center shadow-xl rounded-xl">
            <img
              className="shadow-xl rounded-t-xl"
              src={process.env.PUBLIC_URL + imagePath}
              alt={imagePath}
              style={{ width: "325px", height: "210px" }}
            />
            <span className="text-2xl text-center font-extralight">{ title }</span>
            <div className="flex flex-cols-3 space-x-[15px]">
              <div className="text-sxl">
                <span className="underline">Pros</span>
                <ul className="list-disc ml-[3px] pl-5">
                  {pros.map((pro, index) => (
                    <li key={index} className="text-sl">{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="h-[full] w-[2px] bg-black"></div>
              <div className="text-ssxl">
                <span className="underline">Cons</span>
                <ul className="list-disc ml-[3px] pl-5">
                  {cons.map((con, index) => (
                    <li key={index} className="text-sl">{con}</li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    </div>
  );
};

export default GuideCard;
