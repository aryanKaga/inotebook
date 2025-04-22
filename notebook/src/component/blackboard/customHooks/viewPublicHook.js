import React, { createContext, useContext, useState } from "react";

// Step 1: Create the context
const ViewContext = createContext();

// Step 2: Create the Provider component
export function ViewFileContextProvider({ children }) {
  const [viewid, setviewid] = useState(null);

  return (
    <ViewContext.Provider value={{ viewid,setviewid}}>
      {children}
    </ViewContext.Provider>
  );
}

// Step 3: Custom hook to use the context
export function useViewFile() {
  return useContext(ViewContext);
}

// Optional: export context itself if needed
export { ViewContext };
