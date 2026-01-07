export const genKeyFromPassphrase = async (
  passphrase: string,
  salt: Uint8Array
) => {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encryptWithPassphrase = async (
  passphrase: string,
  plaintext: string
) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await genKeyFromPassphrase(passphrase, salt);
  const enc = new TextEncoder();
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(plaintext)
  );
  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ct))),
    iv: Array.from(iv),
    salt: Array.from(salt),
  };
};

export const decryptWithPassphrase = async (
  passphrase: string,
  ciphertextB64: string,
  ivArr: number[],
  saltArr: number[]
) => {
  const iv = new Uint8Array(ivArr);
  const salt = new Uint8Array(saltArr);
  const key = await genKeyFromPassphrase(passphrase, salt);
  const ct = Uint8Array.from(atob(ciphertextB64), (c) => c.charCodeAt(0));
  const decBuf = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
  return new TextDecoder().decode(decBuf);
};
