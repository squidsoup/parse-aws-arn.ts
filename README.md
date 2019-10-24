# parse-aws-arn.ts 

[![CircleCI](https://circleci.com/gh/unbounce/parse-aws-arn.ts/tree/master.svg?style=svg)](https://circleci.com/gh/unbounce/parse-aws-arn.ts/tree/master)

Parse AWS ARNs into Objects (with TypeScript).

# Install

See https://www.npmjs.com/package/@unbounce/parse-aws-arn

```
npm install --save @unbounce/parse-aws-arn
```

# Usage

``` js
import parseArn from "@unbounce/parse-aws-arn"
const arn = parseArn("arn:aws:lambda:us-west-2:123456:function:magic-lambda-fn")
console.log(arn)

{ partition: 'aws',
  service: 'lambda',
  region: 'us-west-2',
  accountId: '123456',
  resource: 'function:magic-lambda-fn',
  resourceId: 'magic-lambda-fn',
  resourceType: 'function' }
```

Object keys match the format defined in [Amazon Resource Names
(ARNs)](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
Be aware that not all arns match the scheme. The `resourceId` and `resourceType`
*may* be undefined if we're unable to accurately guess the pattern. For example,
S3 Objects have neither a resourceId or a resource type.

# FAQ

> Why create another AWS ARN Parser?

Because we like types.
