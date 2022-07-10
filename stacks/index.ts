import { App } from "@serverless-stack/resources";
import { Cognito } from "./Cognito";
import { Dynamo } from "./Dynamo";
import { Api } from "./Api";

export default function main(app: App) {
  app.setDefaultFunctionProps({
    runtime: "go1.x",
    srcPath: "services",
  });

  app.stack(Cognito).stack(Dynamo).stack(Api);
}
