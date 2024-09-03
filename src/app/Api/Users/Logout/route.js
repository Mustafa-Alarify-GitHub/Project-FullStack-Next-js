import { NextRequest, NextResponse } from "next/server";
import { DeleteCookies } from "../../Cookies/Cookies_Token";

/**
 * @method GET
 * @route ~/Api/Users/Logout
 * @desc Logout user
 * @access private (user himself just)
 */
export function GET() {
  try {
    DeleteCookies();
    return NextResponse.json({
      status: 200,
      messega: "The Logout is Sueecssfuly...",
    });
  } catch (E) {
    return NextResponse.json({
      status: 500,
      messega: "Error In server",
    });
  }
}
