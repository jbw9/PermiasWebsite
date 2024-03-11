import React from "react";

const GuidePage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col mt-[25px]">
        <span className="text-5xl text-center">Getting To UIUC</span>
        <div className="flex flex-row justify-center space-x-[250px]">
          <div>
            <span className="text-2xl ml-[-100px]">Peoria Charter</span>
          </div>
          <div>
            <span className="text-2xl ml-[50px]">Renting A Car</span>
          </div>
          <div>
            <span className="text-2xl ml-[100px]">Uber</span>
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
