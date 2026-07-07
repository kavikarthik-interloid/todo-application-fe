function Notification({ show, message, color }) {
    
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white
      transition-all duration-500
      ${
        show
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }
      ${color}`}
    >
      {message}
    </div>
  );
}

export default Notification;
