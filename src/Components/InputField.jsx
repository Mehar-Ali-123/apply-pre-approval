import React from 'react';
import { useNavigate } from 'react-router-dom';

const InputField = ({ label, type, value, onChange, route }) => {
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const inputString = event.target.value;
    // Remove commas from the input string to store the numeric value without commas.
    const numericValue = inputString.replace(/,/g, '');
    onChange(numericValue);
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     // Navigate to the desired page with the rental income amount.
  //     navigate(route);
  //   }
  // };

  const formattedValue = () => {
    const numericValue = value.replace(/,/g, ''); // Remove existing commas
    const parts = numericValue.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add commas for thousands' place
    const rgx = /(\d+)(\d{6})/;
    while (rgx.test(integerPart)) {
      integerPart = integerPart.replace(rgx, '$1' + ',' + '$2');
    }

    return integerPart + decimalPart;
  }

  return (
    <div className="absolute border-white top-[56px] left-[0px] w-[407px] h-[85.12px] text-left text-[14.19px] text-slategray">
  <img src='/$.png' className='absolute z-10 top-[37px] left-5' />
  <input
    type="number"
    value={formattedValue()}
    onChange={handleInputChange}
    // onKeyDown={handleKeyDown}
    placeholder={label}
    required
    className="pl-10 absolute top-[0px] left-[0px] rounded-[15.07px] border-none bg-light-solid-color-extra-card-background shadow-[0px_19.507625579833984px_70.94px_rgba(0,_0,_0,_0.07),_0px_8.149819374084473px_29.64px_rgba(0,_0,_0,_0.05),_0px_4.357283592224121px_15.84px_rgba(0,_0,_0,_0.04),_0px_2.442657470703125px_8.88px_rgba(0,_0,_0,_0.04),_0px_1.2972769737243652px_4.72px_rgba(0,_0,_0,_0.03),_0px_0.5398260354995728px_1.96px_rgba(0,_0,_0,_0.02)] w-[407px] h-[85.12px]"
  />
</div>

  );
};

export default InputField;
