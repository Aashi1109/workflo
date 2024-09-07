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
