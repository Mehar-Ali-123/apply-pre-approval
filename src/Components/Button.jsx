import React from 'react';
import { useNavigate } from 'react-router-dom';

const Button = ({ route, text }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <button className="text-black text-[20px] rounded-4xs bg-white border-darkslategray-200 box-border border-[3.1px] border-solid hover:bg-darkslategray-200 hover:text-white font-semibold inline-block w-[154.33px] h-[50.87px] cursor-pointer" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
