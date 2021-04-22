import jwt from "jsonwebtoken";

export const generateJWTToken = (payload: any) => {
  const { TOKEN_SECRET } = process.env;
  return jwt.sign(payload, TOKEN_SECRET as string, {
    expiresIn: "2d"
  });
};

export const verifyJWTToken = (payload: any) => {
  const { TOKEN_SECRET } = process.env;
  return jwt.verify(payload, TOKEN_SECRET as string);
};
