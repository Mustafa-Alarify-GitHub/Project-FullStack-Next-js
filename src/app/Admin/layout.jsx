import React from "react";
import SidebarAdmin from "../Compontes/SidebarAdmin";

const layout = ({ children }) => {
  return (
    <div className="flex justify-between flex-row">
      <SidebarAdmin />
     <div className="flex justify-center items-center w-full h-auto">
     {children}
     </div>
    </div>
  );
};

export default layout;
