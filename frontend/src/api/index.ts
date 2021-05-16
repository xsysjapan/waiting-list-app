import { ErrorResponse, LoginFormValues, Session, User } from "../models";

interface SuccessfulResult {
  succeeded: true;
}

interface ErrorResult {
  succeeded: false;
  message: string;
}

async function get(baseUrl: string, params?: any) {
  const p = new URLSearchParams();
  if (params) {
    for (const prop of Object.getOwnPropertyNames(params)) {
      const value = params[prop];
      if (value) {
        p.append(prop, String(value));
      }
    }
  }
  const search = p.toString();
  let url: string;
  if (!search) {
    url = baseUrl;
  } else if (baseUrl.includes("?")) {
    url = `${baseUrl}&${search}`;
  } else {
    url = `${baseUrl}?${search}`;
  }
  return await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
}

async function post(
  url: string,
  params?: any,
  contentType: string = "application/x-www-form-urlencoded"
) {
  if (contentType === "application/x-www-form-urlencoded") {
    const p = new URLSearchParams();
    for (const prop of Object.getOwnPropertyNames(params)) {
      const value = params[prop];
      if (value) {
        p.append(prop, value);
      }
    }
    return await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": contentType,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: p.toString(), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    });
  } else {
    const p = new FormData();
    for (const prop of Object.getOwnPropertyNames(params)) {
      const value = params[prop];
      if (value) {
        p.append(prop, value);
      }
    }
    return await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": contentType,
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: p.toString(), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
    });
  }
}

export async function login(
  values: LoginFormValues
): Promise<SuccessfulResult | ErrorResult> {
  const result = await post("/api/session", values);
  if (result.status === 200) {
    return {
      succeeded: true,
    };
  } else {
    return {
      succeeded: false,
      message: "ユーザー名またはパスワードが正しくありません。",
    };
  }
}

interface SessionResult extends SuccessfulResult {
  user: User;
}

export async function session(): Promise<SessionResult | ErrorResult> {
  const result = await get("/api/session");
  if (result.status === 200) {
    const response = (await result.json()) as Session;
    return {
      succeeded: true,
      user: response,
    };
  }
  const response = (await result.json()) as ErrorResponse;
  return {
    succeeded: false,
    message: response.message,
  };
}