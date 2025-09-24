import crypto from "node:crypto";

const secretEnv = process.env.FORM_SECRET;

if (typeof secretEnv !== "string" || secretEnv.length === 0) {
  throw new Error("FORM_SECRET is required");
}

const SECRET = secretEnv;

export function signTs(ts: string, salt: string) {
  const h = crypto.createHmac("sha256", SECRET);
  h.update(`${ts}:${salt}`);
  return h.digest("hex");
}

export function verifyTs(ts: string, salt: string, sig: string) {
  if (!sig) {
    return false;
  }

  const expected = signTs(ts, salt);

  try {
    const expectedBuf = Buffer.from(expected, "hex");
    const providedBuf = Buffer.from(sig, "hex");

    if (expectedBuf.length !== providedBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(expectedBuf, providedBuf);
  } catch {
    return false;
  }
}
