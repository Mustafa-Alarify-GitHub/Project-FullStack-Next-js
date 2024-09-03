"use client";
import React from "react";
import { useState } from "react";

const FormComments = () => {
  const [text, settext] = useState("");

  function EventLogin(event) {
    event.preventDefault();
    if (text == "" ) return alert("text is requier");
  }
  return (
    <form
      onSubmit={EventLogin}
      className="w-2/3 mt-16 mx-auto  shadow-lg rounded-2xl
       bg-white flex flex-col justify-center items-center p-5"
    >
      <h1 className="text-4xl mb-8 font-bold text-purple-600">Comment</h1>
      <input
        type="text"
        placeholder="text"
        onChange={(val) => settext(val.target.value)}
        value={text}
        className="w-2/3 bg-gray-200 p-3 text-lg"
      />
     
      <button
        className="w-2/3 bg-sky-600
         text-white my-5 py-3 font-bold text-lg border-[3px]
          border-sky-600 duration-300
          hover:text-sky-600 hover:bg-transparent
          hover:text-xl
          "
      >
        Send
      </button>
    </form>
  );
};

export default FormComments;
