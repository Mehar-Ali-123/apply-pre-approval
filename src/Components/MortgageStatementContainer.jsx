import Button from "./Button";
import { useContext, useState } from "react";
import InputField from './InputField'
import { useNavigate } from "react-router-dom";
import { RentalContext } from "../context/RentalContext";

const MortgageStatementContainer = () => {
  const [PIAmount, setPIAmount] = useState("");
  const navigate = useNavigate();
  const { RentalData, setRentalData } = useContext(RentalContext);
  const handleUpdate = (event) => {
    if (event.key === "Enter") {
      setRentalData((prevState) => ({
        ...prevState,
        principal_and_interest: PIAmount,
      }));
      navigate("/questions3");
    }
    setRentalData((prevState) => ({
      ...prevState,
      principal_and_interest: PIAmount,
    }));
  };
  return (
    <div className="absolute top-[335px] left-[644px] w-[441px] h-[348px] text-center text-base text-red font-poppins">
      <div className="absolute top-[0px] left-[0px] w-[430px] h-[89px]">
        <div className="absolute top-[38px] left-[0px] inline-block w-[430px] h-[51px]">
          <span>Note:</span>
          <span className="text-slategray">
            {" "}
            Get this information from most recent mortgage statement,
          </span>
        </div>
        <div className="absolute top-[0px] left-[24px] w-[382px] h-[30.74px] text-5xl text-darkslategray-100">
          <div className="absolute top-[0px] left-[0px] font-semibold inline-block w-[382px] h-[30.74px]">{`Monthly P & I`}</div>
        </div>
      </div>
      <div onKeyDown={handleUpdate} className="absolute top-[55px] left-[11px] w-[407px] h-[85.12px] text-left text-[14.19px] text-slategray">
      <InputField
            label="Enter amount of Monthly P & I"
            type="number"
            value={PIAmount}
            // route="/questions3"
            onChange={setPIAmount}
          />
        {/* <input placeholder="Enter amount of Monthly P & I" className="pl-5 absolute top-[0px] left-[0px] rounded-[15.07px] bg-light-solid-color-extra-card-background shadow-[0px_19.507625579833984px_70.94px_rgba(0,_0,_0,_0.07),_0px_8.149819374084473px_29.64px_rgba(0,_0,_0,_0.05),_0px_4.357283592224121px_15.84px_rgba(0,_0,_0,_0.04),_0px_2.442657470703125px_8.88px_rgba(0,_0,_0,_0.04),_0px_1.2972769737243652px_4.72px_rgba(0,_0,_0,_0.03),_0px_0.5398260354995728px_1.96px_rgba(0,_0,_0,_0.02)] w-[407px] h-[85.12px]" /> */}
        {/* <div className="absolute top-[31.92px] left-[42px]">{`Enter amount of Monthly P & I`}</div> */}
      </div>
      <i className="absolute top-[207px] left-[11px] inline-block text-left w-[430px] h-9">
        <span>*</span>
        <span className="text-slategray">
          Click next if want to leave blank
        </span>
      </i>
      <div className="absolute top-[298px] left-[48px] w-[334.87px] h-[50px] text-darkslategray-200">
        <div className="absolute top-[0px] left-[0px] w-[154px] h-[50px]">
          <Button route={"/questions17"} text={"Back"} />
        </div>
        <div onClick={handleUpdate} className="absolute top-[0px] left-[188.6px] w-[146.27px] h-[50px] text-light-solid-color-extra-card-background">
          <Button route={"/questions3"} text={"Next"} />
        </div>
      </div>
    </div>
  );
};

export default MortgageStatementContainer;
