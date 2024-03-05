import React from "react";

const MerchPage: React.FC = () => {
  return (
    <div>
      <div className="w-full h-[600px] flex justify-center items-end">
        <img
          src={process.env.PUBLIC_URL + "/merch/background.png"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="h-[1200px] w-full mt-[100px] flex flex-col items-center px-[100px]">
        <div className="flex">
          <div className="h-[660px] w-[450px] mr-[200px] bg-merchbg rounded-2xl shadow-2xl flex flex-col justify-center items-center">
            <img
              src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
              alt="2021 hoodie"
              width={450}
            />
            <span className="text-4xl mt-[25px]">2021 Permias Hoodie</span>
            <span className="text-2xl">$25</span>
          </div>
          <div className="h-[660px] w-[450px] bg-merchbg rounded-2xl shadow-2xl flex flex-col justify-center items-center">
            <img
              src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Main.png"}
              alt="2021 hoodie"
              width={450}
            />
            <span className="text-4xl mt-[25px]">2023 Permias Hoodie</span>
            <span className="text-2xl">$25</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchPage;
