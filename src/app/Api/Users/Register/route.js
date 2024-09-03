import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { CreateToken, GetCookies, SetCookies } from "../../Cookies/Cookies_Token";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
// Vaildion
const VaildionCreateNewUser = z.object({
  username: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(15),
});
/**
 * @method POST
 * @route ~/Api/Users/Register
 * @desc Register New User
 * @access public
 */
export async function POST(req) {
  const myData = await req.json();
  try {
    // Validation
    const validation = VaildionCreateNewUser.safeParse(myData);
    if (!validation.success) {
      return NextResponse.json({
        status: 400,
        message: validation.error.issues[0].message,
      });
    }
    // End Validation
    /********************************************************* */
    // Check Users
    const user = await prisma.user.findFirst({
      where: { email: myData.email },
    });
    if (user) {
      return NextResponse.json({
        status: 400,
        message: "this user is already exist",
      });
    }
    // End Check Users
    /********************************************************* */
    // Register
    const saltRounds = 10;
    const hash = await bcrypt.hashSync(myData.password, saltRounds);
    const data = await prisma.user.create({
      data: {
        username: myData.username,
        email: myData.email,
        password: hash,
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
      },
    });
    // Make Token
    const Token = CreateToken(
      {
        id: data.id,
        username: data.username,
        isAdmin: data.isAdmin,
      },
      "30m"
    );
    // set In cookies
    const cookies = SetCookies(Token)

    return NextResponse.json(
      {
        status: 200,
        data,
        Token,
        message: "The Register is Sueecss",
      },
      {
        headers: GetCookies(cookies),
      }
    );
  } catch (E) {
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}
//bcrypt.compareSync(myPlaintextPassword, hash);
