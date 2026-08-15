// Ekjon-matro admin, tai jsonwebtoken er moto extra library na install kore
// nijei simple signed token banacchi. Web Crypto API (globalThis.crypto)
// use kortesi karon eita Node.js API route ebong Edge middleware -
// dutate e kaj kore, kono compatibility issue hoy na.

const encoder = new TextEncoder();

function toBase64Url(bytes) {
  const binary = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET missing - .env.local e set koro");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

// Login successful hole 7 din er jonno valid ekta token banay
export async function createSessionToken() {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7;
  const payload = JSON.stringify({ admin: true, exp: expiresAt });
  const payloadB64 = toBase64Url(encoder.encode(payload));

  const key = await getKey();
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));

  return `${payloadB64}.${toBase64Url(signature)}`;
}

// Token tamper kora hoyeche kina (signature mismatch) ar expire hoye
// geche kina - dutai check kore
export async function verifySessionToken(token) {
  if (!token) return false;

  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return false;

  const key = await getKey();
  const expectedSignature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadB64)
  );
  const expectedSigB64 = toBase64Url(expectedSignature);

  if (expectedSigB64 !== sigB64) return false;

  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(payloadJson);
    if (payload.exp < Date.now()) return false;
    return payload.admin === true;
  } catch {
    return false;
  }
}