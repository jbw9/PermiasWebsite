import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="">
      <div className="w-full h-[600px] flex justify-center items-end mb-[100px]">
        <img
          src={process.env.PUBLIC_URL + "/AboutUs/background.jpg"}
          alt="Background"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="mb-4 text-4xl text-left">About Us</h1>
            <span className="text-lg text-left">
              PERMIAS UIUC, or commonly known as the Indonesian Students Club
              (ISC), is an Indonesian community in the heart of Urbana -
              Champaign. We strive to unite the Indonesian community within the
              University of Illinois at Urbana-Champaign while also promoting
              our culture to the greater community in Illinois.
            </span>
          </div>
          <div className="flex justify-center md:w-1/2 md:justify-end">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/AboutUs/image1.JPG"}
              alt="PERMIAS LOGO"
              height={400}
              width={550}
            />
          </div>
        </div>
      </div>

      <div className="container px-4 pt-32 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/AboutUs/image2.JPG"}
              alt="PERMIAS LOGO"
              height={400}
              width={550}
            />
          </div>
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="mb-4 text-4xl text-right">Our Vision</h1>
            <span className="text-lg text-right">
              At PERMIAS UIUC, our vision extends beyond merely creating a fun
              and safe environment for the Indonesian community in
              Urbana-Champaign. We aspire to be a beacon of Indonesian culture,
              heritage, and values in Illinois, fostering a deeper understanding
              and appreciation among the diverse tapestry of communities we live
              in.
            </span>
          </div>
        </div>
      </div>

      <div className="container px-4 py-32 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="mb-4 text-4xl">Our Mission</h1>
            <span className="text-lg">
              Our mission is to promote Indonesian culture to the
              Urbana-Champaign community, provide networking opportunities for
              Indonesian students, and connect PERMIAS UIUC members with the
              wider Indonesian community in the Midwest area.
            </span>
          </div>
          <div className="flex justify-center md:w-1/2 md:justify-end">
            <img
              className="shadow-2xl rounded-xl"
              src={process.env.PUBLIC_URL + "/AboutUs/image3.JPG"}
              alt="PERMIAS LOGO"
              height={400}
              width={550}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
