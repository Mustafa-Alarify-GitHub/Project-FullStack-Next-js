import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { verifyToken } from "../../Cookies/Cookies_Token";

const prisma = new PrismaClient();
// Vaildion
const VaildionUpdateCommits = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(8).max(15),
});
// Vaildion
const VaildionCreateCommits = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(8).max(15),
});


/**
 * @method GET
 * @route ~/Api/Commits/:id
 * @desc Get all commits By Articals
 * @access puplic
 */
export async function GET(req, props) {
  try {
    const id = parseInt(props.params.id);
    // Scan Token In cookies ***********************************
    // if (
    //   req.cookies.get("token") === undefined ||
    //   req.cookies.get("token") === null ||
    //   req.cookies.get("token") === ""
    // )
    //   return NextResponse.json({
    //     status: 401,
    //     message: `not token provided, access denied plz Login frist`,
    //   });
    // const cookies = req.cookies.get("token").value;
    // const token = verifyToken(cookies);

    // Check Your admin  ***********************************
    // if (token.isAdmin === true) {
      const commits = await prisma.commit.findMany({
        where: { articleId: id },
      });
      return NextResponse.json({
        status: 200,
        data: commits,
        message: "Sueecss",
      });
    // }
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
/**
 * @method POST
 * @route ~/Api/Commits/:id
 * @desc Create new Commits
 * @access private (only user login)
 */
export async function POST(req, props) {
  try {
    const id = parseInt(props.params.id);
    const myData = await req.json();
    // Scan Token In cookies
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

    // Validation
    const validation = VaildionCreateCommits.safeParse(myData);
    if (!validation.success)
      return NextResponse.json({
        status: 400,
        message: validation.error.issues[0].message,
      });

    // Add commit
    const data = await prisma.commit.create({
      data: {
        title: myData.title,
        description: myData.description,
        userId: token.id,
        articleId:id
      },
    });
    return NextResponse.json({
      status: 201,
      message: "The Created is Sueecssfuly",
    });
  } catch (E) {
    console.log(E);
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}
/**
 * @method put
 * @route ~/Api/Commits/:id
 * @desc Update Commits
 * @access private (only user login)
 */
export async function PUT(req, props) {
  try {
    const id = parseInt(props.params.id);
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
    // Check defined commit ***********************************
    const commit = await prisma.commit.findFirst({ where: { id } });
    if (!commit)
      return NextResponse.json({
        status: 404,
        message: "This commit is not found!",
      });
    // Can Update
    if (token.id === commit.userId || token.isAdmin === true) {
      // Validation
      const myData = await req.json();
      const validation = VaildionUpdateCommits.safeParse(myData);
      if (!validation.success)
        return NextResponse.json({
          status: 400,
          message: validation.error.issues[0].message,
        });

      await prisma.commit.update({
        where: { id },
        data: {
          title: myData.title,
          description: myData.description,
        },
      });
      return NextResponse.json({
        status: 203,
        message: "The created is Sueecss",
      });
    }
    return NextResponse.json({
      status: 403,
      message: "You con not update this commit",
    });
  } catch (E) {
    console.log(E);
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}
/**
 * @method DELETE
 * @route ~/Api/Commits/:id
 * @desc Delete Commits by id
 * @access private (only user login)
 */
export async function DELETE(req, props) {
  try {
    const id = parseInt(props.params.id);
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
    // Check defined commit ***********************************
    const commit = await prisma.commit.findFirst({ where: { id } });
    if (!commit)
      return NextResponse.json({
        status: 404,
        message: "This commit is not found!",
      });
    // Can Update
    if (token.id === commit.userId || token.isAdmin === true) {
      // Validation

      await prisma.commit.delete({ where: { id } });
      return NextResponse.json({
        status: 203,
        message: "The Deleted is Sueecss",
      });
    }
    return NextResponse.json({
      status: 403,
      message: "You con not Deleted this commit",
    });
  } catch (E) {
    console.log(E);
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}
