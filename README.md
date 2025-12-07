# React + TypeScript + Vite + Anthropic Claude + Cognito

cd 1-infra
run cdk deploy --all

in aws cloudformation console open stack berry-buddy---cognito-user-pool
select outputs
copy user pool id and client id and paste them in 2-ui/src/constants/index.ts

then open berry-buddy---api-lambda outputs and copy ApiInvokeUrl and paste them in 2-ui/src/constants/index.ts

cd 2-ui
npm run deploy

open cloudfront stack berry-buddy---app-s3-and-cf and open CloudFrontURL and see app working
