const GetInvolved = () => {
  return (
    <div>
      <div className="flex flex-col items-center mt-[100px]">
        <div className="container px-4 mx-auto">
          <div className="mb-8 text-center">
            <span className="text-5xl font-semibold text-footer">Get </span>
            <span className="text-5xl font-bold text-red">Involved</span>
          </div>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <a
                href="https://www.google.com/forms/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-4"
              >
                <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                  <span className="text-white">Join Our Family</span>
                </div>
              </a>

              <p className="text-gray-600">Become a part of our community</p>
            </div>
            <div className="flex flex-col items-center">
              <a
                href="https://www.google.com/forms/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-4"
              >
                <div className="bg-red rounded-2xl w-[200px] h-[50px] flex justify-center items-center transition-transform duration-300 ease-in-out transform hover:-translate-y-2">
                  <span className="text-white">Leave a Message</span>
                </div>
              </a>
              <p className="text-gray-600">
                Share your thoughts and suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInvolved;
