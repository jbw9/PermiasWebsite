import React, { useRef, useEffect, useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  funImage: string;
  instagram: string;
  linkedin: string;
}

interface PropOpen {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
}

const Popup: React.FC<PropOpen> = ({ isOpen, onClose, member }) => {
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
        className={`relative h-[600px] w-[1000px] bg-white rounded-2xl overflow-hidden ${
          animate ? "scale-100" : "scale-95"
        } transition-transform duration-500 ease-out`}
      >
        <div className="flex items-start mt-[23px] ml-[22px]">
          <img
            src={process.env.PUBLIC_URL + member.funImage}
            alt={member.name}
            width={550}
            height={550}
            className="rounded-lg shadow-2xl"
          />
          <div className="pr-5 ml-4">
            <div className="relative h-[550px]">
              <div>
                {member.bio.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 space-x-[60px]">
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/officers/instagram.png"}
                    alt="Instagram"
                    width={50}
                    height={50}
                  />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={process.env.PUBLIC_URL + "/officers/linkedin.png"}
                    alt="LinkedIn"
                    width={50}
                    height={50}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
