const BgVidIcons = () => {
  return (
    <div>
      <div className="flex space-x-[40px]">
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
      </div>
    </div>
  );
};

export default BgVidIcons;
