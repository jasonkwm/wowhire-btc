"use client";
import { createContext, useContext, useState } from "react";

type GlobalProviderType = {
  employee: any;
  setEmployee: (value: any) => void;
};

const GlobalContext = createContext<GlobalProviderType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: any }) => {
  const [employee, setEmployee] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        employee,
        setEmployee,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useWeb3Auth must be used within a MyProvider");
  }
  return context;
};
