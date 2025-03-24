import { createContext, useState, useContext } from "react";

// Create Context
const SaveFileContext = createContext();

// Provider Component
export function SaveFileContextProvider({ children }) {
  const [save_status, set_saveStatus] = useState(false);

  return (
    <SaveFileContext.Provider value={{ save_status, set_saveStatus }}>
      {children}
    </SaveFileContext.Provider>
  );
}

// Custom Hook for using the context (optional)
export function useSaveFile() {
  return useContext(SaveFileContext);
}

export { SaveFileContext };
