export const createSessionToken = async (uid: string) => {
  // In a real app, you might want to add more claims or use a JWT library
  return Buffer.from(
    JSON.stringify({ uid, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }),
  ).toString("base64");
};
