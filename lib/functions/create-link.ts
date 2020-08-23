import * as AWS from 'aws-sdk'
import { APIGatewayProxyHandlerV2 } from 'aws-lambda'

const dynamo = new AWS.DynamoDB();

export const handler: APIGatewayProxyHandlerV2 = async (event: any) => {
    const body = JSON.parse(event);

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: "hello world"
        })
    }
}