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
      <div className="h-[3000px]">
        <div className="flex items-center justify-center w-full">
          <div className="h-[1200px] w-[1000px] bg-slate-600 mt-[50px]">
            <span>LETTER FROM OUR PRESIDENT</span>
            <span>bla bla bla</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
