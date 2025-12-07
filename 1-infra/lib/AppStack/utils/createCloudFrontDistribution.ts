import { Duration } from "aws-cdk-lib";
import {
  Distribution,
  ViewerProtocolPolicy,
  OriginAccessIdentity,
  ErrorResponse,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { projectName, projectNamePascal } from "../../../constants";

export const createCloudFrontDistribution = (
  scope: Construct,
  bucket: Bucket
): Distribution => {
  // Create Origin Access Identity for CloudFront to access S3
  const originAccessIdentity = new OriginAccessIdentity(
    scope,
    `${projectNamePascal}OAI`,
    {
      comment: `OAI for ${projectName} CloudFront distribution`,
    }
  );

  // Grant CloudFront read access to the S3 bucket
  bucket.grantRead(originAccessIdentity);

  // Custom error responses for SPA routing (React Router)
  const errorResponses: ErrorResponse[] = [
    {
      httpStatus: 403,
      responseHttpStatus: 200,
      responsePagePath: "/index.html",
      ttl: Duration.minutes(5),
    },
    {
      httpStatus: 404,
      responseHttpStatus: 200,
      responsePagePath: "/index.html",
      ttl: Duration.minutes(5),
    },
  ];

  return new Distribution(scope, `${projectNamePascal}CloudFrontDistribution`, {
    comment: `${projectName}---cloudfront-distribution`,
    defaultBehavior: {
      origin: S3BucketOrigin.withOriginAccessIdentity(bucket, {
        originAccessIdentity,
      }),
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    },
    defaultRootObject: "index.html",
    errorResponses,
  });
};
