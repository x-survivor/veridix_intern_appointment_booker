import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

function deriveKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(derivedKey);
    });
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await deriveKey(password, salt);

  return "scrypt:" + salt + ":" + derivedKey.toString("hex");
}

export async function verifyPassword(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const [algorithm, salt, hash, ...extra] = storedHash.split(":");

  if (algorithm !== "scrypt" || !salt || !hash || extra.length > 0) {
    return false;
  }

  const expected = Buffer.from(hash, "hex");

  if (expected.length !== 64 || expected.toString("hex") !== hash.toLowerCase()) {
    return false;
  }

  const actual = await deriveKey(password, salt);
  return timingSafeEqual(actual, expected);
}
