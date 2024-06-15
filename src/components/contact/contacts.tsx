import React from "react";

const Contacts = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 px-4 mb-[100px] md:px-8">
        <span className="text-4xl font-bold text-red mb-[20px] md:text-5xl text-center">
          Contact Us
        </span>
        <span className="text-xl text-center text-footer md:text-2xl">
          Get in touch and let us know how we can help
        </span>
        <div className="flex flex-col items-center mt-[40px] md:flex-row md:space-x-[40px]">
          <div className="h-[468px] w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/Home/networking.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                Collab With Us
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                We'd love to talk about how we can work together.
              </div>
              <div className="w-full mt-[40px] text-base md:text-lg text-center">
                Ewangga: +1 (217) 926 2707
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/permLogo.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                General Permias
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                We're here to help with any questions regarding permias.
              </div>
              <div className="w-full mt-[30px] text-base md:text-lg text-center">
                Leonardo: +1 (217) 979 9614
              </div>
              <div className="w-full text-base text-center md:text-lg">
                Azhura: +1 (217) 693-2442
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/lpdp.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                LPDP
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                Discuss if you have any questions related to LPDP
              </div>
              <div className="w-full mt-[40px] text-base md:text-lg text-center">
                David: +1 (224) 418 8775
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-[40px] md:flex-row md:space-x-[40px]">
          <div className="h-[468px] w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[40px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/grad.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                Graduate Assistant
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                We'd love to assist you anything regarding graduate education at
                UIUC.
              </div>
              <div className="w-full mt-[25px] text-base md:text-lg text-center">
                Regina Giovanni: +1 (551) 297-9660
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200">
            <img
              className="mt-[40px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/indonesiamaju.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-2xl font-semibold text-center md:text-3xl text-footer">
                Indonesia Maju
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                Discuss if you have any questions related to Indonesia Maju
              </div>
              <div className="w-full mt-[65px] text-base md:text-lg text-center">
                Alif: +62 813-8355-0907
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
