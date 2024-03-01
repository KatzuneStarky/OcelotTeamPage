import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-8">
      <h1 className="font-light text-[96px]">
        You can view all our progress from here
      </h1>
      <div className="mt-16 flex items-center gap-[50px]">
        <div className="relative flex-1 h-[500px]">
          <Image src="/p1.jpeg" alt="" fill className="object-cover" />
        </div>
        <div className="flex flex-col flex-1 gap-5">
          <h1 className="text-[40px]">Lorem ipsum dolor sit amet alim consectetur adipisicing elit.</h1>
          <p className="text-xl font-light">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cupiditate, quam nisi magni ea laborum inventore voluptatum
            laudantium repellat ducimus unde aspernatur fuga. Quo, accusantium
            quisquam! Harum unde sit culpa debitis.
          </p>
          <button className="rounded p-4 border-none max-w-max">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;