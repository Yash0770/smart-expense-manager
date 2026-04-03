import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "./auth";

export interface UserPayload extends JwtPayload {
  userId: string;
}

export function getUserFromRequest(req: Request): UserPayload | null {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  if (!token) return null;

  const decoded = verifyToken(token);

  // return decoded;
  // Type guard
  if (!decoded || typeof decoded === "string") return null;

  if (!("userId" in decoded)) return null;

  return decoded as UserPayload;
}