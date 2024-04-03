import React from "react";

const OurPurpose = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <span className="text-4xl font-semibold md:text-5xl text-footer">
          Our{" "}
        </span>
        <span className="text-4xl font-bold md:text-5xl text-red">Purpose</span>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-[54px] mt-[30px]">
        <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
          <img
            className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
            src={process.env.PUBLIC_URL + "/Home/networking.png"}
            alt=""
          />
          <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
            <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
              Networking
            </span>
            <div className="w-full mt-4 text-lg md:text-base">
              Connect with fellow Indonesian students in the to foster
              professional relationships, creating a strong, supportive network
              of peers.
            </div>
          </div>
        </div>
        <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
          <img
            className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
            src={process.env.PUBLIC_URL + "/Home/entertainment.png"}
            alt=""
          />
          <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
            <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
              Entertainment
            </span>
            <div className="w-full mt-4 text-lg md:text-base">
              Attend engaging events organized by our team, creating
              unforgettable experiences together.
            </div>
          </div>
        </div>
        <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
          <img
            className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
            src={process.env.PUBLIC_URL + "/Home/friendship.png"}
            alt=""
          />
          <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
            <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
              Friendship
            </span>
            <div className="w-full mt-4 text-lg md:text-base">
              Forge friendships with peers sharing your culture, building
              enduring connections that extend beyond university life.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurPurpose;
