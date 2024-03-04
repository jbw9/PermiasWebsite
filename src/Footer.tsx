import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="flex items-center justify-between w-screen mx-auto text-white bg-footer">
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
