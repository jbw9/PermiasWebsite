import React from "react";

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
