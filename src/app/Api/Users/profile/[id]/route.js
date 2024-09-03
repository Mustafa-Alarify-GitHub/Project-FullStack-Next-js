import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// Vaildion
const VaildionUpdateUser = z.object({
  email: z.string().trim().email(),
  username: z.string().trim().min(2).max(40),
  password: z.string().trim().min(8).max(15),
});

/**
 * @method GET
 * @route ~/Api/Users/profile/:id
 * @desc  get user profile by id
 * @access private (only user himself or admin)
 */
export async function GET(req, props) {
  const id = parseInt(props.params.id);
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

  const authToken = req.cookies.get("token").value;
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    // get User ******************************************
    if (!user)
      return NextResponse.json({
        status: 404,
        message: "this user is not found!",
      });
    // Authoriztion **************************************
    const decodedToken = jwt.verify(authToken, process.env.PRAIVATE_KEY);
    if (decodedToken.id === id)
      return NextResponse.json({
        status: 200,
        data: user,
        message: "Sueecssfly",
      });
    // Only user Himself ***********************************
    return NextResponse.json({
      status: 403,
      message: `Only user Himself can View this Account`,
    });
  } catch (E) {
    return NextResponse.json({
      status: 500,
      message: "Error in server",
    });
  }
}

/**
 * @method PUT
 * @route ~/Api/Users/profile/:id
 * @desc Update user profile by id
 * @access private (only user himself or admin)
 */
export async function PUT(req, props) {
  try {
    const id = parseInt(props.params.id);
    const myreq = await req.json();
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

    // get User ******************************************
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      return NextResponse.json({
        status: 404,
        message: "this user is not found!",
      });
    // Validation  **************************************
    var validation = VaildionUpdateUser.safeParse(myreq);
    if (!validation.success) {
      return NextResponse.json({
        status: 400,
        message: validation.error.issues[0].message,
      });
    }
    // Authoriztion **************************************
    const authToken = req.cookies.get("token").value;
    const decodedToken = jwt.verify(authToken, process.env.PRAIVATE_KEY);
    if (decodedToken.id === id) {
      var saltRounds = 10;
      const hash = await bcrypt.hashSync(myreq.password, saltRounds);
      const userU = await prisma.user.update({
        where: { id },
        data: {
          email: myreq.email,
          username: myreq.username,
          password: hash,
        },
        select: {
          id: true,
          username: true,
          email: true,
          isAdmin: true,
          updatedAt: true,
        },
      });
      return NextResponse.json({
        status: 200,
        data: userU,
        message: "Sueecssfly",
      });
    }
    // Only user Himself ***********************************
    return NextResponse.json({
      status: 403,
      message: `Only user Himself can View this Account!!!!!!!!`,
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
 * @route ~/Api/Users/profile/:id
 * @desc Delete user profile by id
 * @access private (only user himself or admin)
 */
export async function DELETE(req, props) {
  const ID = parseInt(props.params.id);
  try {
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

    const authToken = req.cookies.get("token").value;
    const user = await prisma.user.findUnique({ where: { id: ID } });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "This uesr is n found!",
      });
    }
    const decodedToken = jwt.verify(authToken, process.env.PRAIVATE_KEY);

    if (decodedToken.id === user.id || decodedToken.isAdmin === true) {
      await prisma.user.delete({ where: { id: ID } });
      return NextResponse.json({
        status: 200,
        message: `The delete is Sueecssfly ${user.username}`,
      });
    } else {
      return NextResponse.json({
        status: 403,
        message: `Only user Himself can Delete this Account`,
      });
    }
  } catch (E) {
    return NextResponse.json({
      status: 500,
      message: "Error in server ",
    });
  }
}
