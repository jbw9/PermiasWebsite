import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl mb-4">About Us</h1>
            <span className="text-lg">
              PERMIAS UIUC, or commonly known as the Indonesian Students Club (ISC), is an Indonesian community in the heart of Urbana - Champaign. We strive to unite the Indonesian community within the University of Illinois at
              Urbana-Champaign while also promoting our culture to the greater community in Illinois.
            </span>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img className="max-w-xs md:max-w-sm lg:max-w-md" src={process.env.PUBLIC_URL + "/AboutUs/image1.JPG"} alt="PERMIAS LOGO" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-32">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2">
            <img className="max-w-xs md:max-w-sm lg:max-w-md" src={process.env.PUBLIC_URL + "/AboutUs/image2.JPG"} alt="PERMIAS LOGO" />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl mb-4 text-right">Our Vision</h1>
            <span className="text-lg text-right">
              At PERMIAS UIUC, our vision extends beyond merely creating a fun and safe environment for the Indonesian community in Urbana-Champaign. We aspire to be a beacon of Indonesian culture, heritage, and values in Illinois,
              fostering a deeper understanding and appreciation among the diverse tapestry of communities we live in.
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-32">
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl mb-4">Our Mission</h1>
            <span className="text-lg">
              Our mission is to promote Indonesian culture to the Urbana-Champaign community, provide networking opportunities for Indonesian students, and connect PERMIAS UIUC members with the wider Indonesian community in the Midwest
              area.
            </span>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img className="max-w-xs md:max-w-sm lg:max-w-md" src={process.env.PUBLIC_URL + "/AboutUs/image1.JPG"} alt="PERMIAS LOGO" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
