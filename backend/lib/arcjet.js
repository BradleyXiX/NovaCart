import arcjet, { tokenBucket, shield, detectBot } from "arcjet";

import "dotenv/config";

// init arcjet

export const arcjetInstance = arcjet({
  key: process.env.ARCJET_KEY,
  log: console,
  /*
    Development-only client stub
    - Purpose: allows Arcjet SDK initialization during local dev by returning an "allow" decision
      and performing a no-op report. This prevents startup failures when you don't have a
      production Arcjet transport configured.
    - Replace for production: provide a real client/transport implementation that implements
      `decide(context, details, rules)` and `report(context, details, decision, rules)`.
      For example, use the official Arcjet transport or wire an HTTP client that calls your
      Arcjet backend/endpoint. Also ensure `ARCJET_KEY` is set in your environment.
  */
  client: {
    async decide() {
      return {
        isDenied() {
          return false;
        },
        ttl: 0,
        results: [],
      };
    },
    async report() {
      return;
    },
  },
  characteristics: ["ip.src"],
  rules: [
    // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
    shield({ mode: "LIVE" }),
    // detectBot identifies and blocks requests from bots
    detectBot({
      mode: "LIVE",
      // block all bots except search engines
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    // rate limiting

    tokenBucket({
      mode: "LIVE",
      refillRate: 30,
      interval: 5,
      capacity: 20,
    }),
  ],
});
