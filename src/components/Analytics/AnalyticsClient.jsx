"use client";

import { Analytics } from "@vercel/analytics/react";

export default function AnalyticsClient() {
  const beforeSend = (event) => {
    try {
      // set this once in your browser devtools:
      // localStorage.setItem("va-disable", "true")
      if (localStorage.getItem("va-disable") === "true") {
        if (process.env.NODE_ENV !== "production") {
          console.log("Vercel Analytics: Ignoring event for developer");
        }
        return null; // drop this event
      }
    } catch {
      // localStorage might be blocked; just send the event
    }
    return event; // keep event
  };

  return <Analytics beforeSend={beforeSend} />;
}
