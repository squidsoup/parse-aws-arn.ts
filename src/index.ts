export interface Arn {
  partition: string;
  service: string;
  region?: string;
  accountId?: string;
  resource: string;
  resourceId?: string;
  resourceType?: string;
}

function coerceToUndefined(s: string): string | undefined {
  if (s === "") {
    return undefined;
  }
  return s;
}

function splitAt(s: string, char: string): [string, string] {
  const index = s.indexOf(char);
  if (index === -1) {
    return [s, ""];
  }

  return [s.substring(0, index), s.substring(index + 1)];
}

function parseResourceIdAndType(resourceIdAndType: string[]) {
  // assume to have format: arn:partition:service:region:account-id:resource-type/resource-id
  if (resourceIdAndType.length === 1 && resourceIdAndType[0].includes("/")) {
    const [resourceType, resourceId] = splitAt(resourceIdAndType[0], "/");
    return {
      resourceId,
      resourceType
    };
  }
  // assume to have format: arn:partition:service:region:account-id:resource-type:resource-id
  else if (resourceIdAndType.length > 1) {
    const [resourceType, ...resourceIds] = resourceIdAndType;
    return {
      // re-join by : incase there are additional characters
      resourceId: resourceIds.join(":"),
      resourceType
    };
  }
}

/**
 * Parses a string ARN into an object
 *
 * See https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
 */
export function parseArn(arn: string): Arn {
  const [
    ARN,
    partition,
    service,
    region,
    accountId,
    ...resourceIdAndType
  ] = arn.split(":");

  if (ARN !== "arn") {
    throw new Error("ValidationError: arn must start with `arn:`");
  }

  return {
    partition,
    service,
    region: coerceToUndefined(region),
    accountId: coerceToUndefined(accountId),
    resource: resourceIdAndType.join(":"),
    ...parseResourceIdAndType(resourceIdAndType)
  };
}

export default parseArn;
