import React from "react";

const GuidePage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col mt-[25px]">
        <span className="text-5xl text-center">Getting To UIUC</span>
        <div className="flex flex-row justify-center space-x-[250px] mt-[25px]">
          <div className="text-center shadow-xl rounded-xl">
            <img
              className="shadow-xl rounded-t-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/PeoriaCharterBus.jpg"}
              alt="Peoria Charter Bus"
              style={{ width: "300px", height: "auto" }}
            />
            <span className="text-2xl text-center font-extralight">Peoria Charter</span>
            <div className="flex flex-cols-3 space-x-[15px]">
              <div className="text-sxl">
                <span className="underline">Pros</span>
                <ul className="list-disc pl-5">
                  <li className="text-sl">Relatively Cheap</li>
                  <li className="text-sl">Convienient</li>
                  <li className="text-sl">Comfortable</li>
                </ul>
              </div>
              <div className="h-[full] w-[2px] bg-black"></div>
              <div className="text-ssxl">
                <span className="underline">Cons</span>
                <ul className="list-disc ml-[5px] pr-2">
                  <li className="text-sl">Has Stops</li>
                  <li className="text-sl">Inconsistent Time</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/EnterpriseRentalCar.jpg"}
              alt="Rental Car"
              style={{ width: "300px", height: "auto" }}
            />
            <span className="text-2xl text-center font-extralight ml-[100px]">Renting</span>
          </div>
          <div>
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/Amtrak.jpg"}
              alt="Rideshare"
              style={{ width: "300px", height: "auto" }}
            />
            <span className="text-s2xl ml-[40px]">Amtrak</span>
          </div>
        </div>
      </div>
      <div className="flex flex-cols-2 space-x-[250px] justify-center mt-[25px] ">
        <div className="flex flex-col">
          <span className="text-5xl">Urbana-Champaign</span>
          <span className="text-2xl"> Getting Around Campus</span>
          <span className=""></span>
        </div>
        <div>
          <span className="text-5xl">Campustown</span>
        </div>
      </div>

    </div>
  );
};

export default GuidePage;
