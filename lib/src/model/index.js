import * as AWS from "aws-sdk";
const dynamoDBClient = () => {
    if (true) {
        return new AWS.DynamoDB.DocumentClient({
            region: "localhost",
            endpoint: "http://localhost:5000",
        });
    }
    return new AWS.DynamoDB.DocumentClient();
};
export default dynamoDBClient;
//# sourceMappingURL=index.js.map