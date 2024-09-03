import React from "react";
import Link from "next/link";

const nav = () => {
  const btnNav = [
    { name: "Home", link: "/Home" },
    { name: "Api", link: "/" },
    { name: "About", link: "/About" },
    { name: "Dashboard", link: "/Admin" },
  ];
  const style_link =
    "hover:text-violet-800 hover:underline transition font-medium text-2xl mr-1";
  return (
    <section className=" shadow-2xl h-16  bg-white flex flex-row justify-around items-center">
      <div className="w-full flex flex-row justify-start gap-2 ">
        <h1 className="mx-5 text-violet-800 font-[700] text-3xl mr-16">
          FremWork Next Js
        </h1>
        {btnNav.map((e, index) => (
          <Link key={index} href={e.link} className={style_link}>
            {e.name}
          </Link>
        ))}
      </div>
      <div className="w-1/4 flex justify-around">
        <Link
          href={"/Login"}
          className="bg-sky-500 px-4 py-1 block 
           rounded-xl text-white text-sm cursor-pointer 
        hover:bg-sky-800 transition
        "
        >
          Login
        </Link>
        <Link
          href={"/Register"}
          className="bg-sky-500 px-4 py-1 rounded-xl
         text-white text-sm cursor-pointer 
        hover:bg-sky-800 transition
        "
        >
          Register
        </Link>
      </div>
    </section>
  );
};

export default nav;
