import React from "react";

const GuidePage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col mt-[25px]">
        <span className="text-5xl text-center">Getting To UIUC</span>
        <div className="flex flex-row justify-center space-x-[250px] mt-[25px]">
          <div className="text-center">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/PeoriaCharterBus.jpg"}
              alt="Peoria Charter Bus"
              style={{ width: "200px", height: "auto" }}
            />
            <span className="text-s2xl text-center ml-[0px]">Peoria Charter</span>
            <span className=""></span>
          </div>
          <div className="">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/EnterpriseRentalCar.jpg"}
              alt="Rental Car"
              style={{ width: "200px", height: "auto" }}
            />
            <span className="text-s2xl ml-[30px]">Renting A Car</span>
          </div>
          <div>
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/GuidePage/Rideshare.webp"}
              alt="Rideshare"
              style={{ width: "200px", height: "auto" }}
            />
            <span className="text-s2xl ml-[45px]">Rideshare</span>
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
