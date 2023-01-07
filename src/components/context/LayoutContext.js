import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LayoutContext = createContext();

export const LayoutPrivider = ({ children }) => {
  return <LayoutContext.Provider>{children}</LayoutContext.Provider>;
};

export default LayoutContext;
