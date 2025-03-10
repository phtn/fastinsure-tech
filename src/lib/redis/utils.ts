import { client } from './index';
import { type RedisJSON } from '@redis/json/dist/commands';

export const redisJsonOps = {
  async setJson<T extends RedisJSON>(key: string, value: T, expirationSeconds?: number): Promise<void> {
    await client.json.set(key, '$', value);
    if (expirationSeconds) {
      await client.expire(key, expirationSeconds);
    }
  },

  async getJson<T extends RedisJSON>(key: string): Promise<T | null> {
    const result = await client.json.get(key);
    return result as T | null;
  },

  async deleteKey(key: string): Promise<void> {
    await client.del(key);
  }
};
