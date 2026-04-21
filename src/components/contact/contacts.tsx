import React from "react";
import { useSiteContent } from "../../hooks/useSiteContent";

const Contacts = () => {
  const content = useSiteContent(
    [
      "contact_collab_title",
      "contact_collab_desc",
      "contact_collab_contact",
      "contact_general_title",
      "contact_general_desc",
      "contact_general_contact1",
      "contact_general_contact2",
      "contact_lpdp_title",
      "contact_lpdp_desc",
      "contact_lpdp_contact",
      "contact_grad_asst_title",
      "contact_grad_asst_desc",
      "contact_grad_asst_contact",
      "contact_indonesia_maju_title",
      "contact_indonesia_maju_desc",
      "contact_indonesia_maju_contact",
    ],
    {
      contact_collab_title: "Collab With Us",
      contact_collab_desc: "We'd love to talk about how we can work together.",
      contact_collab_contact: "Ewangga: +1 (217) 926 2707",
      contact_general_title: "General Permias",
      contact_general_desc: "We're here to help with any questions regarding permias.",
      contact_general_contact1: "Leonardo: +1 (217) 979 9614",
      contact_general_contact2: "Azhura: +1 (217) 693-2442",
      contact_lpdp_title: "LPDP",
      contact_lpdp_desc: "Discuss if you have any questions related to LPDP",
      contact_lpdp_contact: "David: +1 (224) 418 8775",
      contact_grad_asst_title: "Graduate Assistant",
      contact_grad_asst_desc: "We'd love to assist you anything regarding graduate education at UIUC.",
      contact_grad_asst_contact: "Regina Giovanni: +1 (551) 297-9660",
      contact_indonesia_maju_title: "Indonesia Maju",
      contact_indonesia_maju_desc: "Discuss if you have any questions related to Indonesia Maju",
      contact_indonesia_maju_contact: "Alif: +62 813-8355-0907",
    }
  );

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
                {content.contact_collab_title}
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                {content.contact_collab_desc}
              </div>
              <div className="w-full mt-[40px] text-base md:text-lg text-center">
                {content.contact_collab_contact}
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
                {content.contact_general_title}
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                {content.contact_general_desc}
              </div>
              <div className="w-full mt-[30px] text-base md:text-lg text-center">
                {content.contact_general_contact1}
              </div>
              <div className="w-full text-base text-center md:text-lg">
                {content.contact_general_contact2}
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
                {content.contact_lpdp_title}
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                {content.contact_lpdp_desc}
              </div>
              <div className="w-full mt-[40px] text-base md:text-lg text-center">
                {content.contact_lpdp_contact}
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
                {content.contact_grad_asst_title}
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                {content.contact_grad_asst_desc}
              </div>
              <div className="w-full mt-[25px] text-base md:text-lg text-center">
                {content.contact_grad_asst_contact}
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
                {content.contact_indonesia_maju_title}
              </span>
              <div className="w-full mt-4 text-base text-center md:text-lg">
                {content.contact_indonesia_maju_desc}
              </div>
              <div className="w-full mt-[65px] text-base md:text-lg text-center">
                {content.contact_indonesia_maju_contact}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
