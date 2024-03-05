import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo";

const WebsiteTitle: React.FC = () => {
  return (
    <div className="relative flex justify-center h-full">
      <div className="text-7xl mt-[80px]">PERMIAS UIUC</div>
      <div className="absolute bottom-0 flex justify-center items-center h-[100px] w-[200px] mb-[10px]">
        <div className="flex">
          <a
            href="https://web.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
              alt="Whatsapp Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.instagram.com/permiasuiuc/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/instagram.svg"}
              alt="Instagram Logo"
              width={50}
              className="mx-10"
            />
          </a>
          <a
            href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fisc.uiuc%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/footer/facebook.svg"}
              alt="Facebook Logo"
              width={50}
              className="mx-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="">
        <BackgroundVideo
          source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"}
          children={<WebsiteTitle />}
        />
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="h-[1200px] w-full mt-[50px] flex flex-col items-center px-[100px]">
          <h1 className="mb-[30px] text-4xl text-center">
            LETTER FROM OUR PRESIDENT
          </h1>
          <div className="flex flex-col w-full md:flex-row md:items-start">
            <div className="md:flex-grow md:pr-4">
              <p className="mb-4 text-lg text-justify">
                On behalf of the brothers of the Zeta Gamma Chapter, we welcome
                you to the official website of Phi Chi Theta at the University
                of Illinois! As a premier professional organization, our chapter
                is nationally recognized as a proven catalyst for driven and
                imaginative students, propelling them toward tangible success in
                the real world. Although we are a business fraternity, our
                brothers span 10 colleges and 39 majors and are united by a
                shared passion for business and innovation.
              </p>
              <p className="mb-4 text-lg text-justify">
                Through our four career-oriented internal groups, skill-building
                workshops, and corporate sponsors, PCT provides a platform for
                all members to realize their personal and professional goals.
                Our accomplished members and esteemed alumni have made
                remarkable contributions across an array of industries, spanning
                from Consulting and Technology to Medicine and Law. No matter
                your background or interests, our extensive resources and
                network can help you shape and realize the future of your
                dreams.
              </p>
              <p className="mb-4 text-lg text-justify">
                As an organization, we take immense pride in our enduring
                dedication to serving the local community, instrumental in our
                growth. Through engaging in service opportunities, fundraising
                events, and recurring volunteer initiatives with institutions
                throughout the Champaign-Urbana area, we provide a platform
                where our brothers can actively contribute to causes they are
                passionate about.
              </p>
              <p className="mb-4 text-lg text-justify">
                While we equip our members with ample resources for professional
                success and making an impact, our shared bond of brotherhood
                strengthens our connection.
              </p>
              <p className="text-lg text-left">Warm Regards,</p>
              <p className="text-lg text-left">Aisha Tanjung</p>
              <p className="text-lg text-left">President | Class of 2025</p>
            </div>
            <div className="md:flex md:justify-end md:flex-shrink-0 ml-[40px]">
              <img
                className="shadow-2xl rounded-xl"
                src={process.env.PUBLIC_URL + "/officers/aisha.png"}
                alt="president picture"
                style={{ width: "400px", height: "auto" }}
              />
            </div>
          </div>
          <h1 className="text-4xl text-center mt-[50px]">
            New to Urbana-Champaign?
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
