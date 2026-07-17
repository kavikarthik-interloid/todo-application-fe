const HeroSection = ({ handleLogin }) => {
  const getStarted = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="w-full h-full flex ">
      <div className="flex flex-col justify-center items-center text-center w-full px-4 sm:px-8 md:px-12 lg:px-16">
        <div className="w-fit rounded-lg p-2 font-medium text-sm  md:text-md lg:text-lg xl:text-xl">
          <span className=" w-full font-sans font-bold ">
            {" "}
            <span className="bg-black text-white p-1 rounded-md font-medium ">
              {" "}
              Newly
            </span>{" "}
            Built for Smart Teams
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif pt-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#E6C687] via-[#FFF3B3] via-[#D4AF37] to-[#AA7C11]">
          Your Daily Tasks
          <br />
          Organized Effortlessly
        </h1>
        <p className="font-light text-gray-500 pt-5">
          TaskWise helps you manage daily tasks, assign teammates, and track
          progress — all in a simple, fast, and visual workspace.
        </p>
        <button
          className="rounded-lg bg-gray-800 px-5 mt-8 py-2 font-serif text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
          onClick={getStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
