import { RemovalPolicy } from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { projectName, projectNamePascal } from "../../../constants";

export const createS3Bucket = (scope: Construct): Bucket => {
  return new Bucket(scope, `${projectNamePascal}AppBucket`, {
    bucketName: `${projectName}---app-bucket`,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    publicReadAccess: false,
    enforceSSL: true,
  });
};
