const FreshmanSpotlight = () => {
  return (
    <div className="">
      <div className="flex space-x-[50px]">
        <div className="mr-[40px]">
          <div className="h-[500px] w-[400px] bg-red rounded-2xl"></div>
          <div className="h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl z-3 mt-[-475px] ml-[25px]">
            <img
              src={process.env.PUBLIC_URL + "/Home/freshmanSpotlight.png"}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-3xl text-footer">Freshman</span>
          <span className="text-5xl font-bold text-red">Spotlight</span>
          <span className="text-2xl mt-[40px]">
            "Being a part of PERMIAS immerses freshman in the vibrant Indonesian
            community, celebrating our rich culture through engaging events and
            shared experiences"
          </span>
          <span className="mt-[10px] text-lg">Andi Alif Badawi Harist</span>
          <span className="mt-[-5px] text-lg">Class of 2027</span>
        </div>
      </div>
    </div>
  );
};

export default FreshmanSpotlight;
