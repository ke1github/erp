'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ModuleContextType = {
  selectedModule: string;
  setSelectedModule: (module: string) => void;
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

export const ModuleProvider = ({ children }: { children: ReactNode }) => {
  const [selectedModule, setSelectedModule] = useState<string>('dashboard');

  return (
    <ModuleContext.Provider value={{ selectedModule, setSelectedModule }}>
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModule must be used within a ModuleProvider');
  }
  return context;
};
