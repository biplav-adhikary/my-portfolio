import { createContext, useContext, useState, type ReactNode } from "react";

interface ActiveSectionContextType {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  return useContext(ActiveSectionContext);
}
