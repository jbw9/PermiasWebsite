import React from "react";

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
          <div className="text-center shadow-xl rounded-xl">
            <img
              className="shadow-xl rounded-t-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/EnterpriseRentalCar.jpg"}
              alt="Rental Car"
              style={{ width: "325px", height: "210px" }}
            />
            <span className="text-2xl text-center font-extralight">Rental Car</span>
            <div className="flex flex-cols-3 space-x-[15px]">
              <div className="text-sxl">
                <span className="underline">Pros</span>
                <ul className="list-disc ml-[3px] pl-5">
                  <li className="text-sl">Flexibility</li>
                  <li className="text-sl">Convieniency</li>
                  <li className="text-sl">Cheap With People</li>
                </ul>
              </div>
              <div className="h-[full] w-[2px] bg-black"></div>
              <div className="text-ssxl">
                <span className="underline">Cons</span>
                <ul className="list-disc ml-[6px] pr-2">
                  <li className="text-sl">Pricy Alone</li>
                  <li className="text-sl">Slippery In Winter</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center shadow-xl rounded-xl">
            <img
              className="shadow-xl rounded-t-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/Amtrak.jpg"}
              alt="Amtrak"
              style={{ width: "325px", height: "210px" }}
            />
            <span className="text-2xl text-center font-extralight">Amtrak</span>
            <div className="flex flex-cols-3 space-x-[15px]">
              <div className="text-sxl">
                <span className="underline">Pros</span>
                <ul className="list-disc ml-[3px] pl-5">
                  <li className="text-sl">Cheapest Option</li>
                  <li className="text-sl">Consistent Times</li>
                  <li className="text-sl"></li>
                </ul>
              </div>
              <div className="h-[full] w-[2px] bg-black"></div>
              <div className="text-ssxl">
                <span className="underline">Cons</span>
                <ul className="list-disc ml-[6px] pr-2">
                  <li className="text-sl">Has Multiple Stops</li>
                  <li className="text-sl">Inconvienient Stops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
