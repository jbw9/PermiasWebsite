import React from "react";

const ContactInfo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 px-8 mx-[50px]">
      <h1 className="text-4xl font-bold text-red mb-[50px]">
        Contact Information
      </h1>
      <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
        <div className="relative mb-12">
          <div className="h-[100px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[100px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">Fulbright</span>
              <span className="text-left w-full pl-4">
                Siti Arfah: +62 857-6277-5599
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="h-[100px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[100px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">LPDP</span>
              <span className="text-left w-full pl-4">
                David: +1 (224) 418 8775
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="h-[100px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[100px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">Grad Assistant</span>
              <span className="text-left w-full pl-4">
                Regina Giovanni: +1 (551) 297-9660
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="h-[100px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[100px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">Indonesia Maju</span>
              <span className="text-left w-full pl-4">
                Alif: +62 813-8355-0907
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="h-[150px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[150px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">General Permias</span>
              <span className="text-left w-full pl-4">
                Leonardo: +1 (217) 979 9614
              </span>
              <span className="text-left w-full pl-4">
                Azhura: +1 (217) 693-2442
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-12">
          <div className="h-[100px] w-[360px] bg-red rounded-2xl absolute top-[-20px] left-[-20px]"></div>
          <div className="h-[100px] w-[360px] bg-white rounded-2xl overflow-hidden shadow-2xl z-3 relative ring-1 ring-gray-200">
            <div className="flex flex-col items-center justify-center space-y-[10px] h-full">
              <span className="text-xl font-bold">Collab with us</span>
              <span className="text-left w-full pl-4">
                Ewangga: +1 (217) 926 2707
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
