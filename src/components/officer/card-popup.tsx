import React, { useRef, useEffect } from "react";

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60">
      <div
        ref={popupRef}
        className="relative h-[600px] w-[1000px] bg-white rounded-2xl"
      >
        {/* Use member prop data for the popup content */}
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
