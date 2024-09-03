import React from "react";
import Link from "next/link";

const SidebarAdmin = () => {
  const btnSide = [
    { name: "Dashboard", link: "/Admin" },
    { name: "Articals", link: "/Admin/Articals-Table" },
    { name: "Comments", link: "/Admin/Comments" },
    { name: "Comments", link: "/Admin/Comments" },

  ];
  return (
    <div className="w-1/6 bg-gray-700 h-[90vh] flex flex-col items-center ">
      {btnSide.map((e, index) => {
        return (
          <Link
            key={index}
            href={e.link}
            className="text-white text-2xl my-3 
            font-bold hover:underline transition">
            {e.name}
          </Link>
        );
      })}
    </div>
  );
};

export default SidebarAdmin;
