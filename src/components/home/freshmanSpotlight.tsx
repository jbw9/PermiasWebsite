import { useSiteContent } from "../../hooks/useSiteContent";

function getImageSrc(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return process.env.PUBLIC_URL + url;
}

const FreshmanSpotlight = () => {
  const content = useSiteContent(
    [
      "home_fresh_spotlight_quote",
      "home_fresh_spotlight_name",
      "home_fresh_spotlight_class",
      "home_fresh_spotlight_image_url",
    ],
    {
      home_fresh_spotlight_quote:
        "Being a part of PERMIAS immersed me in the vibrant Indonesian community, celebrating our rich culture through engaging events and shared experiences",
      home_fresh_spotlight_name: "Andi Alif Badawi Harist",
      home_fresh_spotlight_class: "Class of 2027",
      home_fresh_spotlight_image_url: "/Home/freshmanSpotlight.png",
    }
  );

  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:space-x-[50px] justify-center items-center">
        <div className="md:mr-[40px]">
          <div className="h-[420px] w-[336px] md:h-[500px] md:w-[400px] bg-red rounded-2xl"></div>
          <div className="h-[420px] w-[336px] md:h-[500px] md:w-[400px] rounded-2xl overflow-hidden shadow-2xl z-3 mt-[-390px] md:mt-[-475px] ml-[22px] md:ml-[25px]">
            <img
              src={getImageSrc(content.home_fresh_spotlight_image_url)}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center mt-8 md:mt-0">
          <span className="text-2xl md:text-3xl text-footer">Freshman</span>
          <span className="text-4xl font-bold md:text-5xl text-red">
            Spotlight
          </span>
          <span className="text-xl md:text-2xl md:mt-[40px] mt-[24px]">
            "{content.home_fresh_spotlight_quote}"
          </span>
          <span className="mt-[12px] text-base md:text-lg">
            {content.home_fresh_spotlight_name}
          </span>
          <span className="mt-[-6px] text-base md:text-lg">{content.home_fresh_spotlight_class}</span>
        </div>
      </div>
    </div>
  );
};

export default FreshmanSpotlight;
