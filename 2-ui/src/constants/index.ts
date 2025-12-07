import { Amplify } from "aws-amplify";

export const API_URL =
  "https://sf2si66h63.execute-api.eu-north-1.amazonaws.com";

export const COGNITO_USER_POOL_ID = "eu-north-1_B57KqywL4";
export const COGNITO_CLIENT_ID = "4kcjn0t7vtus08v871vog0uf2";

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolClientId: COGNITO_CLIENT_ID,
      },
    },
  });
};
