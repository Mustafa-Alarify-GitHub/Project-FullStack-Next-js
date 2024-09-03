import React from "react";
import Link from "next/link";
import FormComments from "./FormComments";
import CardCommits from "../../Compontes/CardCommits";

const page = async (props) => {
  const respones = await fetch(
    `http://localhost:3000/Api/articals/${props.params.id}`
  );

  const data_json = await respones.json();
  console.log(data_json.data.commets===undefined);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-4xl mt-7 font-bold text-sky-700">
        {data_json.data.title}
      </h1>
      <p className="w-1/2 text-xl text-center mt-5 text-gray-700">
        {data_json.data.description}
      </p>
      <Link
        href={"/"}
        className="px-28 py-2 rounded-xl mt-5 text-2xl
        font-bold text-white transition
       hover:bg-green-900  bg-green-500"
      >
        Back
      </Link>

      <FormComments />

      <div className="w-2/3">
        {data_json.data.commets!==undefined? data_json.data.commets.map((e, index) => (
          <CardCommits
            title={e.title}
            description={e.description}
            createdAt={e.createdAt}
            key={index}
          />
        )):null}
      </div>
    </div>
  );
};

export default page;
