import React from "react";
import SideBar from "./SideBar";

const Layout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="w-[calc(100vw-18rem)] ">{children}</div>
      </div>
    </>
  );
};

export default Layout;
