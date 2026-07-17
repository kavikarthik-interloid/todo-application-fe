const Header = ({ handleLogin }) => {
  const getStarted = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div className="w-full px-3 md:px-10 font-serif shadow-md">
      <div className="flex items-center justify-between w-full">
        <img src="src/assets/TaskWise1.png" className="w-40"></img>
        <div className="flex justify-around xl:justify-evenly lg:px-4 xl:px-8 2xl:px-36 w-1/2 items-center pt-3 font-medium hidden md:flex">
          <span> Home </span>
          <span> Features </span>
          <span> Solutions </span>
          <span> Pricing </span>
          <span> Resources </span>
        </div>
        <button
          className="rounded-lg bg-gray-800 px-5 mt-3 py-2 text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl"
          onClick={getStarted}
        >
          {" "}
          Get Started{" "}
        </button>
      </div>
    </div>
  );
};

export default Header;
