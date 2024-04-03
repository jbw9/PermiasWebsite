import React, { useRef, useEffect, useState } from "react";

interface PropOpen {
  isOpen: boolean;
  onClose: () => void;
}

const Popup2023: React.FC<PropOpen> = ({ isOpen, onClose }) => {
  const availableSizes = ["XXS", "S", "M", "XL", "XXL"];
  const popupRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
      setTimeout(() => setVisible(false), 500);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed z-10 inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60 ${
        animate ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
      onClick={onClose}
    >
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative h-[600px] w-[1200px] bg-white rounded-2xl overflow-hidden ${
          animate ? "scale-100" : "scale-95"
        } transition-transform duration-500 ease-out flex`}
      >
        <div>
          <img
            className="mt-[30px] ml-[15px]"
            src={process.env.PUBLIC_URL + "/merch/2021_Hoodie_Full.png"}
            alt="2021 hoodie"
            width={825}
          />
        </div>
        <div className="flex flex-col justify-between ml-[10px]">
          <div>
            <span className="block mt-[20px] text-3xl mb-[-10px]">
              2023 Permias Sweater
            </span>
            <div className="flex items-center justify-center">
              <span className="text-2xl my-[20px]">Price: $25</span>
            </div>
            <span className="block mt-[20px] text-lg mb-[20px]">
              Material: Cotton{" "}
            </span>
            <span className="block text-lg ">Sizes:</span>
            <div className="grid grid-cols-4 gap-4 p-4">
              {["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
                <div
                  key={size}
                  className={`relative flex items-center justify-center w-15 h-10 border-2 rounded-full cursor-pointer ${
                    availableSizes.includes(size)
                      ? "bg-red text-white"
                      : "text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {size}
                  {!availableSizes.includes(size) && (
                    <div className="absolute flex items-center justify-center w-full h-full">
                      <div className="w-[2px] h-full bg-black transform -rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center pb-4">
            <a
              href="https://forms.gle/ntyzEceaUkYY81WX8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="text-3xl text-white bg-red rounded-3xl h-[45px] w-[250px] mb-[50px]">
                Buy
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup2023;
