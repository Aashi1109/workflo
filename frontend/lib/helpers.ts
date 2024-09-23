import { ETaskStatus } from "@/types";

export function parseCookie(cookieString: string) {
  const cookieParts = cookieString.split("; ").map((part) => part.trim());

  const [nameValuePair, ...optionsParts] = cookieParts;
  const [name, value] = nameValuePair.split("=");

  const options = optionsParts.reduce((acc: any, option: string) => {
    const [key, val] = option.split("=");
    const normalizedKey = key.toLowerCase();

    if (normalizedKey === "max-age") {
      acc.maxAge = parseInt(val, 10);
    } else if (normalizedKey === "expires") {
      acc.expires = new Date(val);
    } else if (normalizedKey === "samesite") {
      acc.sameSite = val.toLowerCase();
    } else if (normalizedKey === "path") {
      acc.path = val;
    } else if (normalizedKey === "domain") {
      acc.domain = val;
    } else if (normalizedKey === "secure") {
      acc.secure = true;
    } else if (normalizedKey === "httponly") {
      acc.httpOnly = true;
    }
    return acc;
  }, {});

  return {
    name,
    value,
    options,
  };
}

export const canDropTaskInColumn = (
  columnIdentifier: ETaskStatus,
  taskType: ETaskStatus
) => {
  switch (taskType) {
    case ETaskStatus.Todo:
      return columnIdentifier !== ETaskStatus.Todo;
    case ETaskStatus.Finished:
      return columnIdentifier === ETaskStatus.Todo;
    case ETaskStatus.InProgress:
      return [ETaskStatus.UnderReview, ETaskStatus.Finished].includes(
        columnIdentifier
      );
    case ETaskStatus.UnderReview:
      return columnIdentifier !== ETaskStatus.UnderReview;
    default:
      return false;
  }
};

export const createQueryParams = (queryData: { [key: string]: any }) => {
  let queryUrl = "";
  Object.entries(queryData).forEach(([key, value]) => {
    if (value) {
      queryUrl += `${queryUrl.length ? "&" : "?"}${key}=${encodeURIComponent(
        value
      )}`;
    }
  });
  return queryUrl;
};
