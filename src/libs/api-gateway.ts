  // import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
  // import type { FromSchema } from "json-schema-to-ts";

  // type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
  // export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>

  export const formatJSONResponse = (_statusCode: number, response: any):any => {
    return {
      statusCode: _statusCode,
      body: JSON.stringify(response)
    }
  }
