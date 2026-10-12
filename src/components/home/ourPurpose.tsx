import React from "react";
import { useSiteContent } from "../../hooks/useSiteContent";
import { getImageSrc } from "../../utils/imageSrc";
import SectionHeading from "../SectionHeading";

const PURPOSES = ["networking", "entertainment", "friendship"];

const OurPurpose = () => {
  const content = useSiteContent(
    [
      "home_purpose_networking_title",
      "home_purpose_networking_desc",
      "home_purpose_networking_image_url",
      "home_purpose_entertainment_title",
      "home_purpose_entertainment_desc",
      "home_purpose_entertainment_image_url",
      "home_purpose_friendship_title",
      "home_purpose_friendship_desc",
      "home_purpose_friendship_image_url",
    ],
    {
      home_purpose_networking_title: "Networking",
      home_purpose_networking_desc:
        "Connect with fellow Indonesian students to foster professional relationships, creating a strong, supportive network of peers.",
      home_purpose_networking_image_url: "/Home/networking.png",
      home_purpose_entertainment_title: "Entertainment",
      home_purpose_entertainment_desc:
        "Attend engaging events organized by our team, creating unforgettable experiences together.",
      home_purpose_entertainment_image_url: "/Home/entertainment.png",
      home_purpose_friendship_title: "Friendship",
      home_purpose_friendship_desc:
        "Forge friendships with peers sharing your culture, building enduring connections that extend beyond university life.",
      home_purpose_friendship_image_url: "/Home/friendship.png",
    }
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <SectionHeading lead="Our" emphasis="Purpose" />
      <div className="flex flex-col md:flex-row md:space-x-[54px] mt-[30px]">
        {PURPOSES.map((purpose, i) => (
          <div
            key={purpose}
            className={`h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 ${
              i < PURPOSES.length - 1 ? "mb-[36px] md:mb-0" : ""
            }`}
          >
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={getImageSrc(content[`home_purpose_${purpose}_image_url`])}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                {content[`home_purpose_${purpose}_title`]}
              </span>
              <div className="w-full mt-4 text-lg md:text-base">
                {content[`home_purpose_${purpose}_desc`]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPurpose;
