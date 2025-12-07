import express from "express";
import { assistantRouter } from "./routes/assistant.route";
import { decodeCognitoToken } from "./middlewares/cognito-token.middleware";

export const app = express();

app.use(express.json());

// Decode Cognito token from Authorization header
app.use(decodeCognitoToken);

app.use(assistantRouter);

app.listen(3000, () =>
  console.log("Web server is working and listening to port 3000!")
);
