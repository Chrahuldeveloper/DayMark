import React, { createContext, ReactNode, useContext, useState } from 'react'


type WallpaperContextType = {
    wallpaper: string | null;
    setWallpaper: (uri: string | null) => void;
};

const wallpaperContext = createContext<WallpaperContextType | null>(null);

export const WallpaperContext = ({ children }: { children: ReactNode }) => {

    const [wallpaper, setWallpaper] = useState<string | null>(null);

    return (
        <wallpaperContext.Provider value={{ wallpaper, setWallpaper }}>
            {children}
        </wallpaperContext.Provider>
    )

}

export const useWallpaper = () => {
    const context = useContext(wallpaperContext);
    if (!context) {
        throw new Error("useWallpaper must be used within WallpaperProvider");
    }
    return context;
};
