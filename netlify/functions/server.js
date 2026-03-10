import { createRequestHandler } from "@remix-run/node";

let handler;

export default async (req, context) => {
  if (!handler) {
    const build = await import("../../build/server/index.js");
    handler = createRequestHandler(build);
  }
  return handler(req);
};

export const config = {
  path: "/*",
};
