import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
// Vaildion
const VaildionAddArticals = z.object({
  title: z.string().trim().min(5),
  description: z.string().trim().min(5),
});

/**
 * @method GET
 * @route ~/Api/articals/:id
 * @desc Get one Articals
 * @access public
 */
export async function GET(req, props) {
  const ID = parseInt(props.params.id);
  const articale = await prisma.article.findUnique({
    where: { id: ID },
    include:{commets:true}
  });
  if (!articale) {
    return NextResponse.json({
      status: 404,
      message: "article not found!",
    });
  } else {
    return NextResponse.json({
      status: 200,
      data: articale,
      message: "sueecss",
    });
  }
}

/**
 * @method PUT
 * @route ~/Api/articals/:id
 * @desc update one Articals by ID
 * @access public
 */
export async function PUT(req, props) {
  const ID = parseInt(props.params.id);
  const myData = await req.json();
  const articale = await prisma.article.findUnique({
    where: { id: ID },
  });
  // not found
  if (!articale) {
    return NextResponse.json({
      status: 404,
      message: "article not found!",
    });
  }
  const validation = VaildionAddArticals.safeParse(myData);
  if (!validation.success) {
    return NextResponse.json({
      status: 400,
      message: validation.error.issues[0].message,
    });
  }
  await prisma.article.update({
    where: { id: ID },
    data: {
      title: myData.title,
      description: myData.description,
    },
  });
  return NextResponse.json({
    status: 200,
    message: "The Created is sueecssfully.",
  });
}

/**
 * @method DELETE
 * @route ~/Api/articals/:id
 * @desc Delete one Articals by ID
 * @access public
 */
export async function DELETE(req, props) {
  const ID = parseInt(props.params.id);
  const articale = await prisma.article.findUnique({
    where: { id: ID },
  });
  if (!articale) {
    return NextResponse.json({
      status: 404,
      message: "article not found!",
    });
  } else {
    return NextResponse.json({
      status: 200,
      data: articale,
      message: "The Delete is Sueecssfuly",
    });
  }
}
