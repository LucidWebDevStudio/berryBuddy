import { Router } from "express";
import { getThreadsController } from "../controllers/threads/getThreadsController";
import { sendMessageController } from "../controllers/messages/sendMessageController";

export const assistantRouter = Router();

assistantRouter.get("/threads", getThreadsController);
assistantRouter.post("/send-message", sendMessageController);
