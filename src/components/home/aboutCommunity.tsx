import { Link } from "react-router-dom";

const AboutCommunity = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:space-x-[50px]">
        <img
          className="object-cover mb-8 rounded-2xl md:mb-0"
          src={process.env.PUBLIC_URL + "/Home/about.png"}
          alt=""
          height={700}
          width={550}
        />
        <div className="flex flex-col justify-center">
          <span className="text-2xl md:text-3xl text-footer">About our</span>
          <span className="text-4xl font-bold md:text-5xl text-red">
            Community
          </span>
          <span className="md:text-lg md:mt-[20px] text-m mt-[5px]">
            PERMIAS UIUC, also known as the Indonesian Students Club (ISC), is a
            vibrant Indonesian community based in Urbana-Champaign, committed to
            uniting Indonesian students at the University of Illinois at
            Urbana-Champaign and showcasing our rich culture to the wider
            Illinois community. Our vision centers on creating a welcoming and
            engaging environment for socializing and networking, both within the
            local Indonesian community and across the Midwest. Through a variety
            of cultural events and activities, we aim to foster connections,
            promote Indonesian culture, and provide valuable networking
            opportunities for our members.
          </span>
          <div className="mt-[20px] flex justify-center md:inline-block">
            <Link to="/about-us" className="mb-4">
              <div className="bg-red rounded-2xl w-[150px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                <span className="text-white">Read More</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCommunity;
