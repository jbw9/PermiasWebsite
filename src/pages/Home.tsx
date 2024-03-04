import React from "react";
import BackgroundVideo from "../components/home/backgroundvideo"

const WebsiteTitle: React.FC = () => {
  return (
    <div className="text-8xl">
      PERMIAS UIUC
    </div>
  )
}

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="">
        <BackgroundVideo source={process.env.PUBLIC_URL + "/Home/backgroundvid.mp4"} children={<WebsiteTitle />}/>
      </div>
      <div className="h-[1000px]">
        Placeholder
      </div>
    </div>
)};

export default HomePage;
