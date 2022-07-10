import { StackContext, use, AppSyncApi } from "@serverless-stack/resources";
import * as appsync from "@aws-cdk/aws-appsync-alpha";
import { Dynamo } from "./Dynamo";
import { Cognito } from "./Cognito";

export function Api({ stack }: StackContext) {
  const { notesTable } = use(Dynamo);
  const { auth } = use(Cognito);

  const api = new AppSyncApi(stack, "AppSyncApi", {
    schema: "graphql/schema.graphql",
    cdk: {
      graphqlApi: {
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: auth.cdk.userPool,
            },
          },
        },
      },
    },
    dataSources: {
      notes: {
        function: {
          handler: "functions/main.handler",
          timeout: 10,
          environment: {
            NOTES_TABLE: notesTable.tableName,
          },
        },
      },
    },
    resolvers: {
      "Query    listNotes": "notes",
      "Query    getNoteById": "notes",
      "Mutation createNote": "notes",
      "Mutation updateNote": "notes",
      "Mutation deleteNote": "notes",
    },
  });

  api.attachPermissions([notesTable]);

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
