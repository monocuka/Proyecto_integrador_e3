// DataContext.js
import { createContext, useState, useContext } from 'react';


export const DataContext = createContext();

export const DataProvider = (ReservaDetalle) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {ReservaDetalle}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
