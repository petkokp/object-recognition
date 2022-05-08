import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
} from "@aws-sdk/client-dynamodb";

const REGION = "eu-central-1";

const ddbClient = new DynamoDBClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
  },
});

export const createTable = async () => {
  try {
    const params = {
      AttributeDefinitions: [
        {
          AttributeName: "Season", //ATTRIBUTE_NAME_1
          AttributeType: "N", //ATTRIBUTE_TYPE
        },
        {
          AttributeName: "Episode", //ATTRIBUTE_NAME_2
          AttributeType: "N", //ATTRIBUTE_TYPE
        },
      ],
      KeySchema: [
        {
          AttributeName: "Season", //ATTRIBUTE_NAME_1
          KeyType: "HASH",
        },
        {
          AttributeName: "Episode", //ATTRIBUTE_NAME_2
          KeyType: "RANGE",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: "TEST_TABLE", //TABLE_NAME
      StreamSpecification: {
        StreamEnabled: false,
      },
    };

    const data = await ddbClient.send(new CreateTableCommand(params));
    console.log("Table Created", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const listTables = async () => {
  try {
    const data = await ddbClient.send(new ListTablesCommand({}));
    console.log(data);
    // console.log(data.TableNames.join("\n"));
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const describeTable = async (tableName: string) => {
  try {
    const data = await ddbClient.send(
      new DescribeTableCommand({
        TableName: tableName,
      })
    );
    console.log("Success", data);
    // console.log("Success", data.Table.KeySchema);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
