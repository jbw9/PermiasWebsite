import React from "react";
import GuideCard from "../components/guide/card";

const GuidePage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col mt-[25px]">
        <span className="text-5xl text-center">Guide To Urbana-Champaign</span>
        <div className="flex flex-row justify-center space-x-[200px] mt-[25px]">
          <div className="text-center shadow-xl rounded-xl h-[340px]">
            <img
              className="shadow-xl rounded-t-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/.jpg"}
              alt="Getting To UIUC"
              style={{ width: "325px", height: "210px" }}
            />
            <span className="text-2xl text-center font-extralight">Getting To UIUC</span>
            <div className="flex flex-cols-3 space-x-[15px]">
            </div>
          </div>
          <GuideCard 
            imagePath="/GuidePage/EnterpriseRentalCar.jpg"
            title="Rental Car"
            pros={["Flexibility", "Convieniency", "Cheap With People"]}
            cons={["Pricy Alone", "Hard to Drive in Winter"]}
          />
          <GuideCard 
            imagePath="/GuidePage/Amtrak.jpg"
            title="Amtrak"
            pros={["Cheapest Option", "Consistent Times"]}
            cons={["Inconvenient Stops"]}
          />
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
