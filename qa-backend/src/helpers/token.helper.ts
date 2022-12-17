import jwt from "jsonwebtoken";
//
export const generateToken = (user: Record<string, any>) => {
  return jwt.sign({ user }, process.env.JWT_SECRET);
};

export function decodeJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
