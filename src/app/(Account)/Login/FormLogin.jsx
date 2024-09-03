"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";

const FormLogin = () => {
  const route = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  function EventLogin(event) {
    event.preventDefault();
    if (Email == "") return alert("Email is requred!");
    if (Password.length >= 8) return alert("Password is requred!");
    console.log(Email);
    console.log(Password);
    // route.replacep('/Home')
    route.push("/Home?isLogin=True");
    // route.back()
  }
  return (
    <form
      onSubmit={EventLogin}
      className="w-2/3 mt-16 mx-auto  shadow-lg rounded-2xl
       bg-white flex flex-col justify-center items-center p-5"
    >
      <h1 className="text-4xl mb-8 font-bold text-purple-600">Login</h1>
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
        Login
      </button>
    </form>
  );
};

export default FormLogin;

// var cookie = require('cookie');

// function onRequest(req, res) {
//   // Parse the query string
//   var query = url.parse(req.url, true, true).query;

//   if (query && query.name) {
//     // Set a new cookie with the name
//     res.setHeader('Set-Cookie', cookie.serialize('name', String(query.name), {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24 * 7 // 1 week
//     }));

//     // Redirect back after setting cookie
//     res.statusCode = 302;
//     res.setHeader('Location', req.headers.referer || '/');
//     res.end();
//     return;
//   }

//   // Parse the cookies on the request
//   var cookies = cookie.parse(req.headers.cookie || '');

//   // Get the visitor name set in the cookie
//   var name = cookies.name;

//   res.setHeader('Content-Type', 'text/html; charset=UTF-8');

//   if (name) {
//     res.write('<p>Welcome back, <b>' + escapeHtml(name) + '</b>!</p>');
//   } else {
//     res.write('<p>Hello, new visitor!</p>');
//   }

//   res.write('<form method="GET">');
//   res.write('<input placeholder="enter your name" name="name"> <input type="submit" value="Set Name">');
//   res.end('</form>');
// }

// http.createServer(onRequest).listen(3000);
