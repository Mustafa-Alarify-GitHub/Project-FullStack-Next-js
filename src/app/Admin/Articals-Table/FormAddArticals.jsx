"use client";
import React from "react";
import { useState } from "react";

const FormAddArticals = () => {
  const [Title, setTitle] = useState("");
  const [info, setinfo] = useState("");

  function Event(event) {
    event.preventDefault();
    if (Title != "" && info.length >= 8) {
      console.log(Title);
      console.log(info);
    } else {
      console.log("Validation In Your Data");
    }
  }
  return (
    <form
      onSubmit={Event}
      className="w-[1000px] mt-16 mx-auto  shadow-lg rounded-2xl
       bg-white flex flex-col justify-center items-center p-5"
    >
      <h1 className="text-4xl mb-8 font-bold text-purple-600">Add New Articals</h1>
      <label className="text-xl font-bold mb-3">Title </label>
      <input
        type="text"
        placeholder="Title"
        onChange={(val) => setTitle(val.target.value)}
        value={Title}
        className="w-full bg-gray-200 p-3 text-lg"
      />
      <label className="text-xl font-bold mb-3">info </label>
      <input
        type="text"
        placeholder="info"
        onChange={(val) => setinfo(val.target.value)}
        value={info}
        className="w-full bg-gray-200 p-3 text-lg"
      />
      <button
        className="w-full bg-sky-600
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

export default FormAddArticals;
