import React, { useContext } from "react";
import LayoutContext from "../context/LayoutContext";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
function MainContent() {
  useContext({ LayoutContext });
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

export default MainContent;
