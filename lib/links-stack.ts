import * as cdk from '@aws-cdk/core';
import * as db from '@aws-cdk/aws-dynamodb'
import * as ag from '@aws-cdk/aws-apigateway'
import * as la from '@aws-cdk/aws-lambda'

export class LinksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const createLinkFunction = new la.Function(this, 'CreateLink', {
        code: la.Code.fromAsset('lib/functions'),
        handler: 'create-link.handler',
        runtime: la.Runtime.NODEJS_12_X,
        environment: {}
    });

    const api = new ag.RestApi(this, 'links-api', {
        restApiName: "Links Service",
        description: "Handles links to save"
    });

    const getLinksIntegration = new ag.LambdaIntegration(createLinkFunction,{
        requestTemplates: {"application/json": '{ "statusCode": "200" }'}
    })

    api.root.addMethod("POST", getLinksIntegration)

    const database = new db.Table(this, 'Links', {
        partitionKey: { name: 'UserId', type: db.AttributeType.NUMBER },
        sortKey: { name: 'Timestamp', type: db.AttributeType.STRING },
        tableName: 'links'
    })

    database.addGlobalSecondaryIndex({
        indexName: 'Url-Index',
        partitionKey: { name: 'Url', type: db.AttributeType.STRING },
        sortKey: { name: 'Timestamp', type: db.AttributeType.STRING }
    })

    database.grantReadWriteData(createLinkFunction)

  }
}
