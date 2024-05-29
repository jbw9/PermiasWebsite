const GraduateSpotlight = () => {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row md:space-x-[50px] justify-center items-center">
        <div className="md:mr-[40px]">
          <div className="h-[420px] w-[336px] md:h-[500px] md:w-[400px] bg-red rounded-2xl"></div>
          <div className="h-[420px] w-[336px] md:h-[500px] md:w-[400px] rounded-2xl overflow-hidden shadow-2xl z-3 mt-[-390px] md:mt-[-475px] ml-[22px] md:ml-[25px]">
            <img
              src={process.env.PUBLIC_URL + "/Home/graduateSpotlight.png"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center mt-8 md:mt-0">
          <span className="text-2xl md:text-3xl text-footer">Graduate</span>
          <span className="text-4xl font-bold md:text-5xl text-red">
            Spotlight
          </span>
          <span className="text-xl md:text-2xl md:mt-[40px] mt-[24px]">
            "Found a community, a home far away from home, really glad being one
            of the board member, and to be honest really had a blast and
            eventful moments during my time here. Join us!"
          </span>
          <span className="mt-[12px] text-base md:text-lg">
            Yulius A. Mandataputra
          </span>
          <span className="mt-[-6px] text-base md:text-lg">Class of 2027</span>
        </div>
      </div>
    </div>
  );
};

export default GraduateSpotlight;
