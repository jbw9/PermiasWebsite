import React from "react";

const Contacts = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 px-8 mb-[100px]">
        <span className="text-5xl font-bold text-red mb-[20px]">
          Contact Us
        </span>
        <span className="text-2xl text-footer">
          Get in touch and let us know how we can help
        </span>
        <div className="mt-[40px] flex flex-row space-x-[40px]">
          <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/Home/networking.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                Collab With Us
              </span>
              <div className="w-full mt-4 text-lg text-center md:text-base">
                We'd love to talk about how we can work together.
              </div>
              <div className="w-full mt-[40px] text-lg md:text-base text-center">
                Ewangga: +1 (217) 926 2707
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/permLogo.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                General Permias
              </span>
              <div className="w-full mt-4 text-lg text-center md:text-base">
                We're here to help with any questions regarding permias.
              </div>
              <div className="w-full mt-[30px] text-lg md:text-base text-center">
                Leonardo: +1 (217) 979 9614
              </div>
              <div className="w-full text-lg text-center md:text-base">
                Azhura: +1 (217) 693-2442
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[60px] md:mt-[63px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/lpdp.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                LPDP
              </span>
              <div className="w-full mt-4 text-lg text-center md:text-base">
                Discuss if you have any questions related to LPDP
              </div>
              <div className="w-full mt-[40px] text-lg md:text-base text-center">
                David: +1 (224) 418 8775
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[40px] flex flex-row space-x-[40px] justify-center">
          <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[40px] md:mt-[40px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/grad.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                Graduate Assistant
              </span>
              <div className="w-full mt-4 text-lg text-center md:text-base">
                We'd love to assist you anything regarding graduate education at
                UIUC.
              </div>
              <div className="w-full mt-[40px] text-lg md:text-base text-center">
                Regina Giovanni: +1 (551) 297-9660
              </div>
            </div>
          </div>
          <div className="h-[468px] w-[360px] md:h-[468px] md:w-[360px] rounded-2xl flex flex-col items-center shadow-2xl ring-1 ring-gray-200 mb-[36px] md:mb-0">
            <img
              className="mt-[40px] md:mt-[40px] h-[126px] w-[126px] md:h-[158px] md:w-[158px]"
              src={process.env.PUBLIC_URL + "/ContactUs/indonesiamaju.png"}
              alt=""
            />
            <div className="mt-[48px] md:mt-[54px] flex flex-col items-center mx-[36px] md:mx-[36px]">
              <span className="text-3xl font-semibold text-center md:text-3xl text-footer">
                Indonesia Maju
              </span>
              <div className="w-full mt-4 text-lg text-center md:text-base">
                Discuss if you have any questions related to Indonesia Maju
              </div>
              <div className="w-full mt-[65px] text-lg md:text-base text-center">
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
