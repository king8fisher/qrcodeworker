/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from "hono";
import { J, J3x3 } from "./protocol";
import { toLined3x3String, toQrCode, toQrCode3x3 } from "./util";

const app = new Hono();

app.get("/j/:q", async c => {
  const q = c.req.param("q") || "";
  return c.json(toQrCode(q) satisfies J);
});

app.get("/j3x3/:q", async c => {
  const q = c.req.param("q") || "";
  return c.json(toQrCode3x3(q) satisfies J3x3);
});

app.get("/t3x3/:q", async c => {
  const q = c.req.param("q") || "";
  const result: string[] = toLined3x3String(q);
  return c.text(result.join("\n"));
});

export default app;


