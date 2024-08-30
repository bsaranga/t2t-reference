function getTamperedToken(token: string) {
    /// This tampers a token mimicking a man in the middle attack
    const [ header, payload, signature ] = token.split('.');

    const parsedPayload = JSON.parse(atob(payload));
    parsedPayload['role'] = 'ADMIN';

    return `${header}.${btoa(JSON.stringify(parsedPayload))}.${signature}`;
}

/*
    Given a JSON object, specify a set of fields
    to be selected and the rest to be excluded
    from the resulting JSON object
*/
function select(jsonObj: any, fields: string[]) {
    return fields.reduce((result, field) => {
      if (jsonObj.hasOwnProperty(field)) {
        (result as any)[field] = jsonObj[field];
      }
      return result;
    }, {});
}

function matchUrl(url: string, pattern: string): boolean {
  url = url.replace(/^\/(?!\/)/, '');
  // Escape special regex characters in the pattern
  pattern = pattern.replace(/([.+?^=!:${}()|\[\]\/\\])/g, "\\$1");

  // Replace ** with a regex that matches any number of characters, including slashes
  pattern = pattern.replace(/\*\*/g, ".*");

  // Create the regex pattern to match the entire string, ensuring it starts with a forward slash
  const regex = new RegExp(`^${pattern}(\\?.*)?$`);

  return regex.test(url);
}

function isUrlAllowed(url: string, blacklist: string[]): boolean {
  return blacklist.every(pattern => !matchUrl(url, pattern));
}

export { getTamperedToken, select, matchUrl, isUrlAllowed }