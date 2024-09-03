import React from "react";
import Image from "next/image";

const HomePage =async () => {
await new Promise((e)=>setTimeout(e, 5000))

  return (
    <div>
      <div className="w-full flex lg:flex-row md:flex-col justify-between p-3">
        <div className="lg:w-full md:w-1/2 p-10 flex flex-col  bg-white pl-16">
          <h1 className="text-5xl text-purple-900 font-bold my-6 mt-28">
            Fram Work Next
          </h1>
          <h1 className="font-bold text-gray-700 text-lg text-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro
            accusamus ut eligendi enim quaerat dolorem voluptatem accusantium
            aut, beatae tempora error autem asperiores alias! Consectetur saepe
            eius optio neque quos? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Dignissimos impedit mollitia quod, tempore est
            eius possimus, accusamus sed iusto nemo quidem. Ipsam, quas eius
            debitis assumenda exercitationem
          </h1>
        </div>
        <div className="lg:w-full md:w-1/2 p-10 flex flex-col justify-center items-center bg-white">
          <Image
            alt="some thing error"
            src="/img/2.png"
            width={450}
            height={450}
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
