import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verifyToken } from "../../Api/Cookies/Cookies_Token";

const prisma = new PrismaClient();

/**
 * @method GET
 * @route ~/Api/Commits
 * @desc Get all commits
 * @access private (only Admin)
 */
export async function GET(req) {
  try {
    // Scan Token In cookies ***********************************
    if (
      req.cookies.get("token") === undefined ||
      req.cookies.get("token") === null ||
      req.cookies.get("token") === ""
    )
      return NextResponse.json({
        status: 401,
        message: `not token provided, access denied plz Login frist`,
      });
    const cookies = req.cookies.get("token").value;
    const token = verifyToken(cookies);

    // Check Your admin  ***********************************
    if (token.isAdmin === true) {
      const commits = await prisma.commit.findMany();
      return NextResponse.json({
        status: 200,
        data: commits,
        message: "Sueecss",
      });
    }
    // Only user Himself ***********************************
    return NextResponse.json({
      status: 403,
      message: `Only Admin`,
    });
  } catch (E) {
    console.log(E);
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}