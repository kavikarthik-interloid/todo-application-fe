function Notification({ message, color }) {
  return (
    <div
      className={`fixed top-5 right-5 px-5 py-3 rounded-lg shadow-lg text-white
      transition-all duration-500 font-inter
      ${color}`}
    >
      {message}
    </div>
  );
}

export default Notification;
