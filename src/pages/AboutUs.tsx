import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div>
      <div className="flex items-end justify-center w-full md:h-[600px]">
        <img
          src={process.env.PUBLIC_URL + "/AboutUs/background.png"}
          alt="Background"
          className="object-cover w-full h-[250px] md:h-[600px]"
        />
      </div>
      <div className="mt-[60px] md:mt-[100px]">
        <div className="container px-4 mx-auto mb-[70px] md:mb-[80px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col justify-center mb-8 md:w-1/2 md:mb-0 md:pr-8">
              <h1 className="mb-4 text-4xl font-bold text-center md:text-left md:text-5xl text-red">
                About Us
              </h1>
              <span className="text-lg text-left md:text-xl mb-[-20px] md:mb-0">
                PERMIAS UIUC, or commonly known as the Indonesian Students Club
                (ISC), is an Indonesian community in the heart of Urbana -
                Champaign. We strive to unite the Indonesian community within
                the University of Illinois at Urbana-Champaign while also
                promoting our culture to the greater community in Illinois.
              </span>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img
                className="shadow-2xl rounded-xl w-full md:w-auto md:h-[400px]"
                src={process.env.PUBLIC_URL + "/AboutUs/image1.png"}
                alt="PERMIAS LOGO"
              />
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto mb-[35px] md:mb-[80px]">
          <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between">
            <div className="flex justify-center md:w-1/2 md:mb-0 md:mr-16">
              <img
                className="shadow-2xl rounded-xl w-full md:w-auto md:h-[400px] mb-8 md:mb-0" // Adjusted for consistency
                src={process.env.PUBLIC_URL + "/AboutUs/image2.png"}
                alt="PERMIAS LOGO"
              />
            </div>
            <div className="flex flex-col justify-center md:w-1/2 md:ml-16">
              <h1 className="mb-4 text-4xl font-bold text-center md:text-right md:text-5xl text-red">
                Our Vision
              </h1>
              <span className="text-lg text-left md:text-right md:text-xl mb-[15px] md:mb-0">
                At PERMIAS UIUC, our vision extends beyond merely creating a fun
                and safe environment for the Indonesian community in
                Urbana-Champaign. We aspire to be a beacon of Indonesian
                culture, heritage, and values in Illinois, fostering a deeper
                understanding and appreciation among the diverse tapestry of
                communities we live in.
              </span>
            </div>
          </div>
        </div>

        <div className="container px-4 mx-auto mb-[90px] md:mb-[100px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col justify-center mb-8 md:w-1/2 md:mb-0 md:pr-8">
              <h1 className="mb-4 text-4xl font-bold text-center md:text-left text-red md:text-5xl">
                Our Mission
              </h1>
              <span className="text-lg text-left md:text-xl md:text-left mb-[-10px] md:mb-0">
                Our mission is to promote Indonesian culture to the
                Urbana-Champaign community, provide networking opportunities for
                Indonesian students, and connect PERMIAS UIUC members with the
                wider Indonesian community in the Midwest area.
              </span>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img
                className="shadow-2xl rounded-xl w-full md:w-auto md:h-[400px]"
                src={process.env.PUBLIC_URL + "/AboutUs/image3.png"}
                alt="PERMIAS LOGO"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
