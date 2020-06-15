import parseArn from "./index";

describe("parseArn", () => {
  it("fails on unexpected input", () => {
    expect(() => parseArn("foobarbaz")).toThrowError(
      "ValidationError: arn must start with `arn:`"
    );
  });

  it("parses a S3 bucket ARN correctly", () => {
    const arn = "arn:aws:s3:::hello-world";
    expect(parseArn(arn)).toEqual({
      partition: "aws",
      resource: "hello-world",
      service: "s3",
    });
  });

  it("parses IAM ARNs correctly", () => {
    const arn =
      "arn:aws:iam::123456789012:user/division_abc/subdivision_xyz/Bob";

    expect(parseArn(arn)).toEqual({
      accountId: "123456789012",
      partition: "aws",
      resource: "user/division_abc/subdivision_xyz/Bob",
      resourceType: "user",
      resourceId: "division_abc/subdivision_xyz/Bob",
      service: "iam",
    });
  });

  it("parses a Lambda ARN correctly", () => {
    const arn =
      "arn:${Partition}:lambda:${Region}:${Account}:function:${FunctionName}";

    expect(parseArn(arn)).toEqual({
      accountId: "${Account}",
      partition: "${Partition}",
      region: "${Region}",
      resource: "function:${FunctionName}",
      resourceType: "function",
      resourceId: "${FunctionName}",
      service: "lambda",
    });
  });

  it("parses cloudformation ARNs correctly", () => {
    const arn =
      "arn:${Partition}:cloudformation:${Region}:${Account}:stackset/${StackSetName}:${Id}";
    expect(parseArn(arn)).toEqual({
      accountId: "${Account}",
      partition: "${Partition}",
      region: "${Region}",
      resource: "stackset/${StackSetName}:${Id}",
      resourceType: "stackset/${StackSetName}",
      resourceId: "${Id}",
      service: "cloudformation",
    });
  });

  it("parse a CloudWatch LogGroup correctly", () => {
    const arn =
      "arn:${Partition}:logs:${Region}:${Account}:log-group:${LogGroupName}:log-stream:${LogStreamName}";

    expect(parseArn(arn)).toEqual({
      accountId: "${Account}",
      partition: "${Partition}",
      region: "${Region}",
      resource: "log-group:${LogGroupName}:log-stream:${LogStreamName}",
      resourceType: "log-group",
      resourceId: "${LogGroupName}:log-stream:${LogStreamName}",
      service: "logs",
    });
  });
});
