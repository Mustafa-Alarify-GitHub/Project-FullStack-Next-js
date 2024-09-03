import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <center>
        <Image
          alt="sssss"
          src={"/img/1.png"}
          width={600}
          height={600}
          priority
        ></Image>
      </center>
    </div>
  );
};

export default page;
