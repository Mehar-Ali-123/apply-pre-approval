// RentalContext.js
import React, { createContext, useState } from 'react';

const RentalContext = createContext();

const RentalProvider = ({ children }) => {
  const [RentalData, setRentalData] = useState({
    rental_choice: "Tax Return",
    rents: 0,
    royalities: 0,
    advertising: 0,
    auto_travel: 0,
    cleaning_maintenance: 0,
    commissions: 0,
    insurance: 0,
    fees: 0,
    manage_fee: 0,
    repairs: 0,
    supplies: 0,
    taxes: 0,
    nod_rented: 0,
    utilities: 0,
    principal_and_interest: 0,
    hoa: 0,
    other: 0,
  });

  return (
    <RentalContext.Provider value={{ RentalData, setRentalData }}>
      {children}
    </RentalContext.Provider>
  );
};

export { RentalContext, RentalProvider };
