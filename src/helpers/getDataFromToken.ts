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

    // console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload | DecodedToken;

    if (typeof decodedToken === "object" && "id" in decodedToken) {
      // Log specific details rather than the whole object to avoid circular references.
      // console.log(`Decoded token ID: ${decodedToken.id}`);
      return decodedToken.id;
    } else {
      throw new Error("Invalid token structure");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      // Avoid converting the entire error object to JSON if it has circular references.
      throw new Error(`Error decoding token: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while decoding the token.");
    }
  }
};
