import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { shortRedirectResponse } from "./lib/short-redirects";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
const recentLeadRequests = new Map<string, number>();

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"}, try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Belt and braces for the 404 page's <meta name="robots" content="noindex">:
// crawlers that skip the HTML still get the header.
function markNotFound(response: Response): Response {
  if (response.status !== 404) return response;
  const headers = new Headers(response.headers);
  headers.set("x-robots-tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.pathname === "/api/leads") {
        return await handleLeadRequest(request, env);
      }
      const redirect = shortRedirectResponse(url);
      if (redirect) return redirect;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return markNotFound(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  business?: unknown;
  requirement?: unknown;
  requestId?: unknown;
};

async function handleLeadRequest(request: Request, env: unknown): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse({ error: "Invalid origin" }, 403);
  }

  const bindings = (env ?? {}) as Record<string, unknown>;
  const webhookUrl =
    typeof bindings["LEAD_WEBHOOK_URL"] === "string" ? bindings["LEAD_WEBHOOK_URL"] : "";
  if (!webhookUrl) {
    return jsonResponse({ error: "Lead storage is not configured" }, 503);
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return jsonResponse({ error: "Invalid request" }, 400);
  }

  const name = cleanLeadValue(payload.name, 120);
  const phone = cleanLeadValue(payload.phone, 20);
  const business = cleanLeadValue(payload.business, 160);
  const requirement = cleanLeadValue(payload.requirement, 2000);
  const requestId = cleanLeadValue(payload.requestId, 80);
  if (!name || !requirement || !/^[+]91[6-9]\d{9}$/.test(phone) || !requestId) {
    return jsonResponse({ error: "Invalid lead details" }, 400);
  }

  const now = Date.now();
  for (const [id, createdAt] of recentLeadRequests) {
    if (now - createdAt > 15 * 60 * 1000) recentLeadRequests.delete(id);
  }
  if (recentLeadRequests.has(requestId)) {
    return jsonResponse({ error: "Duplicate request" }, 409);
  }
  recentLeadRequests.set(requestId, now);

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "content-type": "application/json", "x-idempotency-key": requestId },
      body: JSON.stringify({
        name,
        phone,
        business,
        requirement,
        submittedAt: new Date(now).toISOString(),
        source: "Website entry pop-up",
      }),
    });
    if (!upstream.ok) {
      recentLeadRequests.delete(requestId);
      return jsonResponse({ error: "Lead storage failed" }, 502);
    }
    return jsonResponse({ ok: true }, 200);
  } catch {
    recentLeadRequests.delete(requestId);
    return jsonResponse({ error: "Lead storage failed" }, 502);
  }
}

function cleanLeadValue(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function jsonResponse(body: Record<string, boolean | string>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
