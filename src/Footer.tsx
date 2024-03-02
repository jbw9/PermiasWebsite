import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex items-center justify-between mx-auto text-white bg-footer w-screen">
      <div className="m-7">
        <div className="text-3xl">Contact Us</div>
        <div>Couldn't find what you're looking for?</div>
        <div>Contact us through email to get in touch!</div>
        <a
          href="mailto:permias.uiuc@gmail.com"
          className="text-blue-500 hover:underline"
        >
          permias.uiuc@gmail.com
        </a>
      </div>
      <div className="flex">
        <a
          href="https://web.whatsapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/footer/whatsapp.svg"}
            alt="Whatsapp Logo"
            width={50}
            className="mx-10"
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
            className="mx-10"
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
            className="mx-10"
          />
        </a>
      </div>
      <div className="items-end m-7">
        <div className="text-xl">New Student?</div>
        <div>
          <a href="">Apply Here!</a>
        </div>
        <div>
          <a href="">Events</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
