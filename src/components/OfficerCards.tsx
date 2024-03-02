const OfficerCards = () => {
  return (
    <div className="h-[550px] w-[340px]">
      <div className="h-[475px] w-full rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={process.env.PUBLIC_URL + "/officers/aisha.JPG"}
          alt="Officer"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center p-4">
        <span className="block text-2xl">Aisha Tanjung</span>
        <span className="block">President</span>
      </div>
    </div>
  );
};

export default OfficerCards;
