const BgVidIcons = () => {
  return (
    <div>
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
            className="mx-4 w-[35px] md:w-[50px] md:mx-10"
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
            className="mx-4 w-[35px] md:w-[50px] md:mx-10"
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
            className="mx-4 w-[35px] md:w-[50px] md:mx-10"
          />
        </a>
      </div>
    </div>
  );
};

export default BgVidIcons;
