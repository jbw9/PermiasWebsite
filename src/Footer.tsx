import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between w-screen mx-auto text-white bg-red h-[150px]">
      <div className="flex justify-center w-full space-x-14 mt-[40px]">
        <a
          href="https://web.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
            alt="Whatsapp Logo"
            width={50}
            className=""
          />
        </a>
        <a
          href="https://www.instagram.com/permiasuiuc/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/instagram.svg"}
            alt="Instagram Logo"
            width={50}
            className=""
          />
        </a>
        <a
          href="https://www.facebook.com/checkpoint/1501092823525282/?next=https%3A%2F%2Fwww.facebook.com%2Fisc.uiuc%2F"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/facebook.svg"}
            alt="Facebook Logo"
            width={50}
            className=""
          />
        </a>
        <a
          href="mailto:permias.uiuc@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/mail.png"}
            alt="Whatsapp Logo"
            width={50}
            className=""
          />
        </a>
      </div>
      <span className="mb-[10px]">
        © 2024 Indonesian Student Association at the University of Illinois
        Urbana-Champaign
      </span>
    </div>
  );
};

export default Footer;
