import axios from "axios";

export const texReturn = async (values) => {
    try {
      const result = await axios.get("https://api.oqteq.com/api/v1/rentalCalculations", values);
      
      console.log("🚀 ~ file: auth.ts:12 ~ login ~ result:", result)
      return result;
    } catch (error) {
      console.log("🚀 ~ file: auth.ts:24 ~ login ~ error:", error);
      return error.response;
    }
  };

  export const rentalAgreement = async (values) => {
    console.log("🚀 ~ file: api.js:16 ~ rentalAgreement ~ values:", values)
    try {
      const result = await axios.post("https://api.oqteq.com/api/v1/rentalCalculations", values);
      localStorage.setItem('RentalResult', result?.data?.net_rent);
      console.log("🚀 ~ file: auth.ts:12 ~ login ~ result:", result?.data?.net_rent)
      return result;
    } catch (error) {
      console.log("🚀 ~ file: auth.ts:24 ~ login ~ error:", error);
      return error.response;
    }
  };