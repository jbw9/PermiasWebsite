import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="">
      <div className="mb-12 ml-40 mt-[40px]">
        <span className=" text-4xl">About Us</span>

        <div className="mt-4 flex">
          <span className="pr-[50px]">
            PERMIAS UIUC or commonly known as the Indonesian Students Club (ISC)
            is an Indonesian community in the heart of Urbana - Champaign. We
            strive to unite the Indonesian community within the University of
            Illinois at Urbana-Champaign while also promoting our culture to the
            greater community in Illinois.
          </span>
          <img
            className="mr-[200px] pl-[100px]"
            src={process.env.PUBLIC_URL + "/AboutUs/image1.JPG"}
            alt="PERMIAS LOGO"
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
