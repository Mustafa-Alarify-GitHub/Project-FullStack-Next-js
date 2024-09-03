import React from "react";
import Link from "next/link";
const notfound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-red-700 text-3xl mb-10">not 404 found</h1>
      <Link href={"/Home"}>Go TO home</Link>
    </div>
  );
};

export default notfound;
