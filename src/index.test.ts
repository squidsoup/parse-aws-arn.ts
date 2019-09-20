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
      resourceId: "hello-world",
      service: "s3"
    });
  });

  it("parses IAM ARNs correctly", () => {
    const arn =
      "arn:aws:iam::123456789012:user/division_abc/subdivision_xyz/Bob";

    expect(parseArn(arn)).toEqual({
      accountId: "123456789012",
      partition: "aws",
      resourceType: "user",
      resourceId: "division_abc/subdivision_xyz/Bob",
      service: "iam"
    });
  });

  it("parses a Lambda ARN correctly", () => {
    const arn = "arn:aws:lambda:us-west-2:123456:function:magic-lambda-fn";

    expect(parseArn(arn)).toEqual({
      accountId: "123456",
      partition: "aws",
      region: "us-west-2",
      resourceType: "function",
      resourceId: "magic-lambda-fn",
      service: "lambda"
    });
  });
});
