const Button = ({ text }) => {
  return (
    <button className="text-white bg-black py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-800 transition hover:scale-105 shadow-lg font-bold text-center ">
      {text}
    </button>
  );
};

export default Button;
