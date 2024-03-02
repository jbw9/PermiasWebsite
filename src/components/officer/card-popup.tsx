import React, { useState } from "react";

interface PropOpen {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PropOpen> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60">
      <div className="relative h-[550px] w-[700px] bg-white rounded-2xl">
        <button className="absolute top-0 right-0 p-5" onClick={onClose}>
          <img
            src={process.env.PUBLIC_URL + "/officers/close.png"}
            alt="close"
            className="object-cover w-4 h-4"
          />
        </button>
        <button className="">
          <img
            src={process.env.PUBLIC_URL + "/officers/instagram.png"}
            alt="close"
            className="object-cover w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
};

export default Popup;
