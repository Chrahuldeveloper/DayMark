import React, { useContext, createContext, useState, ReactNode } from 'react'


type Progress = {
    Ring: boolean;
    Bar: boolean;
    Fade: boolean;
}

type ProgressStyleContextType = {
    progress: Progress;
    setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

const progressStyleContext = createContext<ProgressStyleContextType | null>(null)

export const ProgressStyleContext = ({ children }: { children: ReactNode }) => {
    const [progress, setProgress] = useState<Progress>({
        Ring: false,
        Bar: false,
        Fade: false,
    });

    return (
        <progressStyleContext.Provider value={{ progress, setProgress }}>
            {children}
        </progressStyleContext.Provider>
    )

}

export const useProgressStyle = () => {
  const context = useContext(progressStyleContext);
  if (!context) {
    throw new Error(
      "useProgressStyle must be used within ProgressStyleProvider"
    );
  }
  return context;
};
