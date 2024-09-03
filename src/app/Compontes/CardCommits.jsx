import React from "react";

const CardCommits = ({ title, description, createdAt }) => {
  return (
    <div className="bg-blue-100 rounded-lg w-full p-5 my-4 shadow-xl flex flex-col">
      <h1 className="font-bold text-xl">{title}</h1>
      <h1 className="text-gray-600 my-1">{createdAt}</h1>
      <p>
      {description}
      </p>
      <div className="w-full flex justify-around flex-row my-2 mt-5">
        <button className="w-1/3 bg-green-600 py-2 font-bold text-white hover:bg-green-900 transition">
          update
        </button>
        <button className="w-1/3 bg-red-600 py-2 font-bold text-white hover:bg-red-900 transition">
          delete
        </button>
      </div>
    </div>
  );
};

export default CardCommits;
