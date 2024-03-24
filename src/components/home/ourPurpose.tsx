import React from "react";

const OurPurpose = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div>
        <span className="text-5xl font-semibold text-footer">Our </span>
        <span className="text-5xl font-bold text-red">Purpose</span>
      </div>
      <div className="flex space-x-[60px] mt-[30px]">
        <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
          <img
            className="mt-[70px]"
            src={process.env.PUBLIC_URL + "/Home/networking.png"}
            alt=""
            height={175}
            width={175}
          />
          <div className="mt-[60px] flex flex-col items-center mx-[40px]">
            <span className="text-4xl font-semibold text-center text-footer">
              Networking
            </span>
            <div className="w-full mt-4 text-lg">
              Connect with fellow Indonesian students in the to foster
              professional relationships, creating a strong, supportive network
              of peers.
            </div>
          </div>
        </div>
        <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
          <img
            className="mt-[70px]"
            src={process.env.PUBLIC_URL + "/Home/entertainment.png"}
            alt=""
            height={175}
            width={175}
          />
          <div className="mt-[60px] flex flex-col items-center mx-[40px]">
            <span className="text-4xl font-semibold text-center text-footer">
              Entertainment
            </span>
            <div className="w-full mt-4 text-lg">
              Attend engaging events organized by our team, creating
              unforgettable experiences together.
            </div>
          </div>
        </div>
        <div className="h-[520px] w-[400px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
          <img
            className="mt-[70px]"
            src={process.env.PUBLIC_URL + "/Home/friendship.png"}
            alt=""
            height={175}
            width={175}
          />
          <div className="mt-[60px] flex flex-col items-center mx-[40px]">
            <span className="text-4xl font-semibold text-center text-footer">
              Friendship
            </span>
            <div className="w-full mt-4 text-lg">
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
