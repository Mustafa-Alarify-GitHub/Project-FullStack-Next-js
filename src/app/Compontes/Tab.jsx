"use client";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Row = (prop) => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [count, setcount] = useState("");
  const [data, setstate] = useState([]);
  function click() {
    setstate([...data, { name, price, count }]);
    setname("");
    setprice("");
    setcount("");
  }
  console.log(prop);

  return (
    <div>
      <div>
        <table className="w-2/3 m-auto mt-4 text-lg">
          <thead>
            <tr className="text-center">
              <td>اسم العنصر</td>
              <td>سعر القطعه</td>
              <td>الكميه</td>
              <td>أجمالي</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((e, index) => {
                return (
                  <tr key={index}>
                    <td>{e.name}</td>
                    <td>{e.price}</td>
                    <td>{e.count}</td>
                    <td>{e.count * e.price}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center mb-7 text-gray-600">
                  <h1>لايوجد بيانات </h1>
                </td>
              </tr>
            )}

            <tr>
              <td>
                <select name="i" className="w-2/3"></select>
              </td>
              <td>
                <input
                  type="number"
                  value={price}
                  onChange={(val) => {
                    setprice(val.target.value);
                  }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={count}
                  onChange={(val) => {
                    setcount(val.target.value);
                  }}
                />
              </td>
              <td>
                <button
                  className="bg-green-500 hover:bg-green-700 transition text-white px-8"
                  onClick={click}
                >
                  أضافه
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};

export default Row;
