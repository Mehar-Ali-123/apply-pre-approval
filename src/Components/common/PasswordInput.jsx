import React from "react";
import { useController } from "react-hook-form";
import { Password } from "primereact/password";
import {HiOutlineLockClosed} from 'react-icons/hi'

const PasswordInput = ({ control, name, label, rules, placeholder, feedback=true }) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { invalid, error },
  } = useController({ name, control, rules });

  return (
    <div>
      <label className="block mb-2" htmlFor={name}>{label}</label>
      <span className="p-input-icon-left w-full">
        <HiOutlineLockClosed className="text-xl z-10" style={{marginTop: '-12px'}} />
        <Password
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          placeholder={placeholder}
          className={`${invalid ? "p-invalid" : ""} w-full`}
          feedback={feedback}
          toggleMask={true}
        />
      </span>
      {invalid && <span className="text-red-600 mt-3">{error.message}</span>}
    </div>
  );
};

export default PasswordInput;