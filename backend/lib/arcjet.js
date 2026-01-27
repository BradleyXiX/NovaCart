import arcjet, { tokenBucket, shield, detectBot } from "arcjet";

import "dotenv/config";

// init arcjet

export const arcjetInstance = arcjet({
  key: process.env.ARCJET_KEY,
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
