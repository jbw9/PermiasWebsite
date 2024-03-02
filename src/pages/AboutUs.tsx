import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <span className="text-lg mb-4 md:mb-0">
              PERMIAS UIUC or commonly known as the Indonesian Students Club (ISC) is an Indonesian community in the heart of Urbana - Champaign. We strive to unite the Indonesian community within the University of Illinois at
              Urbana-Champaign while also promoting our culture to the greater community in Illinois.
            </span>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-start">
            <img className="max-w-xs md:max-w-sm lg:max-w-md" src={process.env.PUBLIC_URL + "/AboutUs/image1.JPG"} alt="PERMIAS LOGO" width={600} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
