import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [isDataPresent, setIsDataPresent] = useState(false);

  return (
    <DataContext.Provider value={{ isDataPresent, setIsDataPresent }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);