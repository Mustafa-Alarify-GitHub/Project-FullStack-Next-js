"use client";
import React from "react";
import Link from "next/link";

const error = ({message}) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1>Error</h1>
      <Link href={"/Home"}>Go TO home</Link>
    </div>
  );
};

export default error;
