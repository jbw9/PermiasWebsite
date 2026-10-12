import React from "react";

// Full-width hero image at the top of the About, Team and Events pages.
const PageBanner: React.FC<{ src: string }> = ({ src }) => (
  <div className="flex items-end justify-center w-full md:h-[600px]">
    <img
      src={src}
      alt="Background"
      className="object-cover w-full h-[300px] md:h-[600px]"
    />
  </div>
);

export default PageBanner;
