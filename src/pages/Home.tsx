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
        <div className="container flex flex-col w-full px-4 mx-auto md:flex-row md:items-start">
          <div className="h-[1200px] w-full mt-[50px] flex flex-col items-center">
            <div className="container">
              <h1 className="mb-[30px] text-4xl text-center">
                LETTER FROM OUR PRESIDENT
              </h1>
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="md:w-1/2 md:pr-4">
                  <p className="mb-4 text-lg text-left">
                    On behalf of the brothers of the Zeta Gamma Chapter, we
                    welcome you to the official website of Phi Chi Theta at the
                    University of Illinois! As a premier professional
                    organization, our chapter is nationally recognized as a
                    proven catalyst for driven and imaginative students,
                    propelling them toward tangible success in the real world.
                    Although we are a business fraternity, our brothers span 10
                    colleges and 39 majors and are united by a shared passion
                    for business and innovation.
                  </p>
                  <p className="mb-4 text-lg text-left">
                    Through our four career-oriented internal groups,
                    skill-building workshops, and corporate sponsors, PCT
                    provides a platform for all members to realize their
                    personal and professional goals. Our accomplished members
                    and esteemed alumni have made remarkable contributions
                    across an array of industries, spanning from Consulting and
                    Technology to Medicine and Law. No matter your background or
                    interests, our extensive resources and network can help you
                    shape and realize the future of your dreams.
                  </p>
                  <p className="mb-4 text-lg text-left">
                    As an organization, we take immense pride in our enduring
                    dedication to serving the local community, instrumental in
                    our growth. Through engaging in service opportunities,
                    fundraising events, and recurring volunteer initiatives with
                    institutions throughout the Champaign-Urbana area, we
                    provide a platform where our brothers can actively
                    contribute to causes they are passionate about.
                  </p>
                  <p className="mb-4 text-lg text-left">
                    While we equip our members with ample resources for
                    professional success and making an impact, our shared bond
                    of brotherhood strengthens our connection. Through our
                    longstanding family and mentorship systems, the people in
                    PCT you will meet will rapidly become your best friends,
                    your biggest cheerleaders, and your best sources of advice
                    during and beyond your four years on campus. You will
                    constantly be inspired to become the best version of
                    yourself, and to lift others up while you do so.
                  </p>
                  <p className="mb-4 text-lg text-left">
                    Joining PCT my Sophomore year was one of the best decisions
                    I’ve made not only in college, but my entire life. From when
                    I initially joined as a new member to now being President, I
                    was immediately welcomed with open arms into a family of
                    some of the most caring, driven, and amazing people on our
                    campus. Whether developing lifelong friendships, being
                    exposed to a plethora of professional opportunities, and
                    through creating my own impact on campus, there’s no other
                    way I’d imagine spending my years at UIUC.
                  </p>
                  <p className="mb-4 text-lg text-left">
                    I encourage you to explore the rest of our website and
                    attend our upcoming recruitment events this semester to get
                    a feel for what we stand for. We would love to meet you and
                    help you discover all that our family has to offer.
                  </p>
                  <p className="text-lg text-left">Warm Regards,</p>
                  <p className="text-lg text-left">Aisha Tanjung</p>
                  <p className="text-lg text-left">President | Class of 2025</p>
                </div>
                <div className="flex justify-center w-full md:w-auto md:justify-end md:mt-0">
                  <img
                    className="shadow-2xl rounded-xl"
                    src={process.env.PUBLIC_URL + "/officers/aisha.png"}
                    alt="PERMIAS LOGO"
                    height={400}
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
