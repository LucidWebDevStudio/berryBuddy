import { Request, Response, NextFunction } from "express";
import { decode } from "jws";

export const decodeCognitoToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const decoded = decode(authHeader);
    if (decoded?.payload) {
      try {
        // Attach JWT payload to request for downstream handlers
        (req as any).decodedIdToken = JSON.parse(decoded.payload);
      } catch (err) {
        console.error("Invalid JWT payload format", err);
      }
    }
  }

  next();
};
