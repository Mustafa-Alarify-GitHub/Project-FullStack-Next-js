import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { CreateToken, GetCookies, SetCookies } from "../../Cookies/Cookies_Token";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
// Vaildion
const VaildionLoginUser = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8).max(15),
});

/**
 * @method POST
 * @route ~/Api/Users/Login
 * @desc Login User
 * @access public
 */

export async function POST(req) {
  try {
    const myData = await req.json();
    // Validation
    const validation = VaildionLoginUser.safeParse(myData);
    if (!validation.success) {
      return NextResponse.json({
        status: 400,
        message: validation.error.issues[0].message,
      });
    }
    // End Validation
    /**********************************************************/
    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: myData.email },
    });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "This user is not found!",
      });
    }
    const isCreutPassword = await bcrypt.compareSync(
      myData.password,
      user.password
    );
    if (isCreutPassword) {
      const Token = CreateToken(
        {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        },
        "30d"
      );

      // Cookies
      const cookies = SetCookies(Token);

      return NextResponse.json(
        {
          data: user,
          // Token,
          message: "Sueecss",
        },
        {
          status: 200,
          headers: GetCookies(cookies),
        }
      );
    } else {
      return NextResponse.json({
        status: 400,
        message: "the password or email is no",
      });
    }
  } catch (e) {
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}
