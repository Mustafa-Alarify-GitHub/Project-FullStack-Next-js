import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verifyToken } from "../Cookies/Cookies_Token";

const prisma = new PrismaClient();
// Vaildion
const VaildionCreateArticals = z.object({
  title: z.string().trim().min(5),
  description: z.string().trim().min(5),
});
/**
 * @method POST
 * @route ~/Api/articals
 * @desc  Add New Articals
 * @access public
 */
export async function POST(req) {
  const mydata = await req.json();
  const cookies = req.cookies.get("token").value;
  const token = verifyToken(cookies);
  const data = await prisma.article.create({
    data: {
      title: mydata.title,
      description: mydata.description,
      userId: token.id,
    },
  });
  return NextResponse.json({ status: "200", message: "Success" ,data});
}

/**
 * @method GET
 * @route ~/Api/articals
 * @desc  Get all Articals by pagition
 * @access public
 */
export async function GET(req) {
  const pageNumber = req.nextUrl.searchParams.get("pageNumber") || 1;
  const data = await prisma.article.findMany({
    skip: (pageNumber - 1) * 6,
    take: 6,
  });
  return NextResponse.json({ status: "200", data });
}
// /**
//  * @method GET
//  * @route ~/Api/articals
//  * @desc  Get all Articals
//  * @access public
//  */
// export async function GET(req) {
//   const data =await prisma.article.findMany();
//   return NextResponse.json({ status: "200", data });
// }
