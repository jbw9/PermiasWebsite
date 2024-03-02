import React, { useRef, useEffect } from "react";

interface PropOpen {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PropOpen> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null); // Create a ref for the popup content

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the popup if the click is outside of the popup content
      }
    }

    // Add when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Return function to be called when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]); // Ensures effect runs only once

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-60">
      <div
        ref={popupRef}
        className="relative h-[600px] w-[1000px] bg-white rounded-2xl"
      >
        <div className="flex items-start mt-[23px] ml-[22px]">
          <img
            src={process.env.PUBLIC_URL + "/officers/aishaFun.JPG"}
            alt="Officer"
            width={550}
            height={550}
            className="rounded-lg shadow-2xl"
          />
          <div className="pr-5 ml-4">
            <div className="relative h-[550px]">
              <div>
                Hey guys! Back at it again with me as the President🫣
                <br />
                <br />
                My name is Aisha. I’m now a junior in food science👩🏻‍🔬 Some fun
                facts about me: I really like cheese😋🧀, even the smelly ones,
                and I LOVE horror movies/games/anything supernatural (I don’t
                get spooked easily👻)
                <br />
                <br />
                I’m pretty busy during the weekdays (I’m also a vp for another
                rso and an intern at a lab), so you’ll most likely find me at
                home sleeping during the weekends to catch up on all the sleep I
                missed😴 If not, 99% you can catch me at Moge Tee any day any
                time #mogeteepleasesponsorme🧋 so feel free to say hi 👋
              </div>
              {/* Absolute positioning within the relative container */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 space-x-[60px]">
                <a
                  href="https://www.instagram.com/aishatanjung_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
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
                  href="https://www.linkedin.com/in/aisha-tanjung-8a7212220/"
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
