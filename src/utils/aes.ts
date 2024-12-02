export const enc = new TextEncoder();
export const dec = new TextDecoder();

async function getKeyFromPassword(password: string) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode("your-salt-here"),
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encrypt(text: string, password: string) {
  const key = await getKeyFromPassword(password);
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    enc.encode(text),
  );

  // Combine IV and encrypted content
  const encryptedArray = new Uint8Array(
    iv.length + encryptedContent.byteLength,
  );
  encryptedArray.set(iv);
  encryptedArray.set(new Uint8Array(encryptedContent), iv.length);

  // Convert to base64 for easy storage/transmission
  return btoa(String.fromCharCode(...encryptedArray));
}

export async function decrypt(encryptedData: string, password: string) {
  const key = await getKeyFromPassword(password);

  // Convert from base64 and extract IV
  const encryptedArray = new Uint8Array(
    atob(encryptedData)
      .split("")
      .map((char) => char.charCodeAt(0)),
  );
  const iv = encryptedArray.slice(0, 12);
  const encryptedContent = encryptedArray.slice(12);

  const decryptedContent = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedContent,
  );

  return dec.decode(decryptedContent);
}

// Usage example:
// async function example() {
//   const password = "my-secret-key";
//   const text = "Hello, World!";

//   try {
//     const encrypted = await encrypt(text, password);
//     console.log("Encrypted:", encrypted);

//     const decrypted = await decrypt(encrypted, password);
//     console.log("Decrypted:", decrypted);
//   } catch (error) {
//     console.error("Encryption error:", error);
//   }
// }

export const btoa = (string: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(string).toString("base64");
  }
  return window.btoa(string);
};
