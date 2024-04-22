import type { AWS } from '@serverless/typescript';
import { createPersona, getAllPersonas, getAllVehiculosSwapi } from '@functions/persona/index';
const apiBaseUrl = process.env.API_BASE_URL || 'https://swapi.py4e.com/api/vehicles/';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-typescript-api',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger','serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage:'dev',
    region:'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      API_BASE_URL: apiBaseUrl,
      NODE_PATH: "./:/opt/node_modules"
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:*:table/PersonasTable",
        }],
      },
    }
  },
  // import the function via paths
  functions: { getAllPersonas, createPersona, getAllVehiculosSwapi },
  package: { 
    exclude:[
      "middy_layer/**"
    ] 
  },
  layers:{
    MiddyDependeciesNodeModule:{
      path:"middy_layer",
      description:"middly dependencies"
    }
  },
  custom:{
    autoswagger:{
      title: 'API PERSONAS',
      version: "1.0.0",
      description:'Esta API esta desarrollado con Serverless Framework en NodeJs y desplegado en AWS. Desarrollado por Orlando Netty Yarasca Lupuche',
      apiType: 'http',
      basePath: '/dev',
      generateSwaggerOnDeploy: true,
      typefiles:['./src/model/response.vehiculo-es.ts','./src/model/response.vehiculo.ts','./src/model/Persona.ts']
    },
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: [],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 6000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      PersonasTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "PersonasTable",
          AttributeDefinitions: [{
            AttributeName: "id",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "id",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },

        }
      }
    }
  }
};
module.exports = serverlessConfiguration;