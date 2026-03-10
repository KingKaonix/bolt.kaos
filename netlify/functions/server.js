const path = require("path");

// Netlify function handler that serves the Remix app
exports.handler = async (event, context) => {
  const { createRequestHandler } = await import("@remix-run/node");
  const build = await import("../../build/server/index.js");

  const handler = createRequestHandler(build);

  const url = new URL(event.rawUrl || `https://${event.headers.host}${event.path}`);

  if (event.queryStringParameters) {
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      url.searchParams.set(key, value);
    }
  }

  const request = new Request(url.toString(), {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body ? (event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body) : undefined,
  });

  const response = await handler(request);

  const headers = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const body = await response.text();

  return {
    statusCode: response.status,
    headers,
    body,
  };
};
