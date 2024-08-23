import { createContext, useState } from "react";

export const ImageDetailsContext = createContext({});

export const ImageDetailsProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return (
    <ImageDetailsContext.Provider value={{ images, setImages }}>
      {children}
    </ImageDetailsContext.Provider>
  );
};
