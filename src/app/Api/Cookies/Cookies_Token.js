// npm i cookie
// npm i jwt
import { serialize } from "cookie";
import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");

/** EX
  const Token = CreateToken(
        {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        "30d"
      );
 */

// Create Json Web Token data is map
export function CreateToken(data, Time) {
  const Token = jwt.sign(data, process.env.PRAIVATE_KEY, {
    expiresIn: `${Time}`,
  });
  return Token;
}
// veri fyToken
export function verifyToken(token) {
  return jwt.verify(token, process.env.PRAIVATE_KEY);
}
// Set Cookies
export function SetCookies(Token) {
  const cookies = serialize("token", Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // http or https
    sameSite: "strict",
    path: "/", // secess only routes
    maxAge: 60 * 60 * 24 * 30, //day
  });
  return cookies;
}
// Get Cookies in Headers
export function GetCookies(cookies) {
  return { "set-Cookie": cookies };
}
// Delete Cookies
export function DeleteCookies() {
  cookies().delete("token");
}
