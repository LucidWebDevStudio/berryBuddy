import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createCloudFrontDistribution } from "./utils/createCloudFrontDistribution";
import { createS3Bucket } from "./utils/createS3Bucket";

export class AppStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = createS3Bucket(this);
    const distribution = createCloudFrontDistribution(this, bucket);

    // Output the CloudFront distribution URL
    new CfnOutput(this, "CloudFrontURL", {
      value: `https://${distribution.distributionDomainName}`,
      description: "CloudFront distribution URL",
      exportName: "CloudFrontURL",
    });

    // Output the CloudFront distribution ID (for cache invalidation)
    new CfnOutput(this, "CloudFrontDistributionId", {
      value: distribution.distributionId,
      description: "CloudFront distribution ID for cache invalidation",
      exportName: "CloudFrontDistributionId",
    });
  }
}
