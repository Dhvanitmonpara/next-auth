import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as
      | JwtPayload
      | DecodedToken;

    if (typeof decodedToken === "object" && "id" in decodedToken) {
      return decodedToken.id;
    } else {
      throw new Error("Invalid token structure");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error decoding token: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while decoding the token.");
    }
  }
};
