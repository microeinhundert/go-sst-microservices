import { StackContext, Table } from "@serverless-stack/resources";

export function Dynamo({ stack }: StackContext) {
  const notesTable = new Table(stack, "Notes", {
    fields: {
      id: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  stack.addOutputs({
    NotesTable: notesTable.tableName,
  });

  return { notesTable };
}
