export const config = {
  runtime: "edge",
};

const VPS_TARGET = "https://vps.lubunet.shop:443";

export default async function handler(req) {
  const url = new URL(req.url);
  const targetUrl = new URL(url.pathname + url.search, VPS_TARGET).toString();

  const newHeaders = new Headers(req.headers);
  newHeaders.set("Host", new URL(VPS_TARGET).host);

  // O fetch no Edge Runtime é otimizado para streaming
  return fetch(targetUrl, {
    method: req.method,
    headers: newHeaders,
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
    redirect: "manual", // Economiza CPU por não processar redirecionamentos
  });
}
