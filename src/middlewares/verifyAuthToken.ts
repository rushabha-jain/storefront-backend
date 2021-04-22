import { Request, Response, NextFunction } from "express";
import { verifyJWTToken } from "../util/jwtToken";

function verifyAuthToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      verifyJWTToken(token);
    } else {
      throw new Error("Missing token");
    }
    next();
  } catch (error) {
    res.status(401).send({
      status: "failure",
      message: error.message
    });
  }
}

export default verifyAuthToken;
