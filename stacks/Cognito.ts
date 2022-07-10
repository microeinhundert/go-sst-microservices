import { StackContext, Auth } from "@serverless-stack/resources";

export function Cognito({ stack }: StackContext) {
  const auth = new Auth(stack, "Auth", {
    login: ["email", "phone"]
  });

  stack.addOutputs({
    UserPoolClientId: auth.userPoolClientId,
  });

  return { auth };
}
