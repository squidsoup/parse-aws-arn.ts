# parse-aws-arn.ts 

[![CircleCI](https://circleci.com/gh/unbounce/parse-aws-arn.ts/tree/master.svg?style=svg)](https://circleci.com/gh/unbounce/parse-aws-arn.ts/tree/master)

Parse AWS ARNs into Objects.

# Usage

``` js
import parseArn from "@unbounce/parse-aws-arn"
const arn = parseArn("arn:aws:lambda:us-west-2:123456:function:magic-lambda-fn")
console.log(arn)

{ partition: 'aws',
  service: 'lambda',
  region: 'us-west-2',
  accountId: '123456',
  resourceId: 'magic-lambda-fn',
  resourceType: 'function' }
```

Object keys match the format defined in [Amazon Resource Names (ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
