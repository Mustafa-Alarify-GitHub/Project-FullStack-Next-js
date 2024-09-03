"use client";
import React from "react";
import { useState } from "react";

const FormRegister = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function EventRegister(event) {
    event.preventDefault();
    if (Email != "" && Name != "" && Password.length >= 8) {
      console.log(Name);
      console.log(Email);
      console.log(Password);
    } else {
      console.log("Validation In Your Data");
    }
  }
  return (
    <form
      onSubmit={EventRegister}
      className="w-2/3 mt-16 mx-auto  shadow-lg rounded-2xl
       bg-white flex flex-col justify-center items-center p-5"
    >
      <h1 className="text-4xl mb-8 font-bold text-purple-600">Register</h1>
      <label className="text-xl font-bold mb-3">Name </label>
      <input
        type="text"
        placeholder="Email"
        onChange={(val) => setName(val.target.value)}
        value={Name}
        className="w-2/3 bg-gray-200 p-3 text-lg"
      />
      <label className="text-xl font-bold mb-3">E-mail </label>
      <input
        type="text"
        placeholder="Email"
        onChange={(val) => setEmail(val.target.value)}
        value={Email}
        className="w-2/3 bg-gray-200 p-3 text-lg"
      />
      <label className="text-xl font-bold mb-3">Password </label>
      <input
        type="password"
        placeholder="Password"
        onChange={(val) => setPassword(val.target.value)}
        value={Password}
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
        Register
      </button>
    </form>
  );
};

export default FormRegister;
