const Header = ({ handleLogin }) => {
  const styles =
    "font-bold bg-clip-text transition-all duration-300 text-transparent bg-[#9CA3AF] hover:bg-gradient-to-r hover:from-[#E6C687] hover:via-[#FFF3B3] hover:via-[#D4AF37] hover:to-[#AA7C11]";
 
 const goldHover = "relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#E6C687] after:via-[#FFF3B3] after:via-[#D4AF37] after:to-[#AA7C11] after:transition-all after:duration-300 group-hover:after:w-full"
  
 const getStarted = (e) => {
    e.preventDefault();
    handleLogin();
  };
  return (
    <div className="w-full font-serif shadow-lg">
      <div className="fixed w-full px-3 sm:px-5 flex items-center justify-between bg-surface-3/50 shadow-md">
        <img src="src/assets/TaskWise1.png" className="w-40"></img>
        <div className="flex justify-around xl:justify-evenly lg:px-4 xl:px-8 2xl:px-36 w-1/2 items-center font-medium hidden md:flex">
          <button className={styles}> Home </button>
          <button className={styles}> Features </button>
          <button className={styles}> Solutions </button>
          <button className={styles}> Pricing </button>
          <button className={styles}> Resources </button>
        </div>
        <button
          className="rounded-lg bg-gray-800 px-5 py-2 text-white transition duration-200 shadow-[0_1px_2px_rgba(33,31,27,0.03),0_6px_16px_-10px_rgba(33,31,27,0.15)] hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_12px_28px_-12px_rgba(33,31,27,0.22)] group"
          onClick={getStarted}
        >
          <span className={goldHover}>
            Get Started
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;

