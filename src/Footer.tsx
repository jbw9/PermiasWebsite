import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between w-screen mx-auto text-white bg-red h-[150px]">
      <div className="flex justify-center w-full mt-[40px] space-x-14 md:space-x-14">
        <a
          href="https://www.instagram.com/permiasuiuc/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/instagram.svg"}
            alt="Instagram Logo"
            width={50}
            className="w-[35px] md:w-[50px]"
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
            className="w-[35px] md:w-[50px]"
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
            className="w-[35px] md:w-[50px]"
          />
        </a>
        <Link to="/counter">
          <img
            src={process.env.PUBLIC_URL + "/footer/login.png"}
            alt="Whatsapp Logo"
            width={50}
            className="w-[35px] md:w-[50px]"
          />
        </Link>
      </div>
      <span className="mb-[15px] text-sm mx-[30px] text-center">
        © 2024 Indonesian Student Association at the University of Illinois
        Urbana-Champaign
      </span>
    </div>
  );
};

export default Footer;
