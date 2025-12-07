import { Request, Response } from "express";
import { getThreadsService } from "../../services/dynamodb/getThreadsService";

export const getThreadsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const decodedIdToken = (req as any).decodedIdToken;
  console.log("getThreadsController");

  const threads = await getThreadsService(decodedIdToken.email);

  res.json(threads);
};
