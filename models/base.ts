import * as dynamoose from 'dynamoose'

dynamoose.aws.sdk.config.update({
  "region": "us-east-1"
});

if (process.env.DYNAMODB_LOCAL_END_POINT) {
  dynamoose.aws.ddb.local(process.env.DYNAMODB_LOCAL_END_POINT)
}

export const gen = (tableName: string, schema) => {
  return dynamoose.model(tableName, schema)
}
