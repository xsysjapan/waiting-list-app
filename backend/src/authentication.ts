import * as cookie from "cookie";
import * as express from "express";
import * as jwt from "jsonwebtoken";

function extractHeaderValue(request: express.Request, headerName: string) {
  const headers = request.headers[headerName];
  if (!headers) {
    return undefined;
  }
  const headerValue = Array.isArray(headers) ? headers[0] : headers;
  if (!headerValue) {
    return undefined;
  }
  return headerValue;
}

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "cookieAuth") {
    let token = extractHeaderValue(request, "x-access-token");
    if (!token) {
      const cookieHeader = extractHeaderValue(request, "cookie");
      if (!cookieHeader) {
        return Promise.reject(new Error("No token provided"));
      }
      const cookieValues = cookie.parse(cookieHeader);
      token = cookieValues["token"];
    }

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new Error("No token provided"));
        return;
      }
      jwt.verify(token, "[secret]", function (err: any, decoded: any) {
        if (err) {
          reject(err);
          return;
        } else {
          if (scopes) {
            // Check if JWT contains all required scopes
            for (let scope of scopes) {
              if (!decoded.scopes.includes(scope)) {
                reject(new Error("JWT does not contain required scope."));
                return;
              }
            }
          }
          resolve(decoded);
          return;
        }
      });
    });
  }
  throw new Error("unknown securityName");
}
