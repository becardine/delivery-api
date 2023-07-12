import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token missing" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(
      token,
      "c3b7b1b9c3c4c5c6c7c8c9cacbcccdcecf"
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token invalid" });
  }
}
