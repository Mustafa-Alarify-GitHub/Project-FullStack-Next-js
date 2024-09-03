import React from "react";
import Link from "next/link";

const HomePage = async () => {
  // await new Promise((e)=>setTimeout(e, 5000))
  const respones = await fetch(
    `http://localhost:3000/Api/articals?pageNumber=1`,{cache:"no-store"}
  );
  const data_json = await respones.json();
  console.log(data_json);

  if (!respones.ok) {
    redirect("/Home");
    throw new Error("Please Check You internet!");
  }
  return (
    <div className="container m-auto px-5 flex flex-wrap">
      {data_json.data.map((e) => {
        return (
          <div
            key={e.id}
            className="p-5 m-2 rounded-lg shadow-lg md:w-[30%] bg-white my-3"
          >
            <h3 className="text-xl font-bold line-clamp-1">
              <span className="text-blue-800 font-bold text-2xl">{e.id}</span> -{" "}
              {e.title}
            </h3>
            <p className="mb-3 line-clamp-4">{e.description}</p>
            <Link
              href={`/Articels/${e.id}`}
              className="px-5 py-1 mt-5 rounded-lg text-white hover:bg-blue-900 transition bg-blue-700"
            >
              Show More
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
