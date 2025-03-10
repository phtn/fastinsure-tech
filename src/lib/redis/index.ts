import { env } from '@/env';
import { createClient } from 'redis';
import { type RedisJSON } from '@redis/json/dist/commands';

const isTest = process.env.NODE_ENV === 'test';

// In-memory store for testing
const testStore = new Map<string, RedisJSON>();
const expirations = new Map<string, NodeJS.Timeout>();

export const client = isTest
  ? {
      json: {
        set: async (key: string, _path: string, value: RedisJSON) => {
          testStore.set(key, value);
          return 'OK';
        },
        get: async (key: string) => {
          return testStore.get(key) ?? null;
        },
      },
      expire: async (key: string, seconds: number) => {
        if (testStore.has(key)) {
          // Clear any existing expiration
          const existingTimeout = expirations.get(key);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }

          // Set new expiration
          const timeout = setTimeout(() => {
            testStore.delete(key);
            expirations.delete(key);
          }, seconds * 1000);

          expirations.set(key, timeout);
          return true;
        }
        return false;
      },
      del: async (key: string) => {
        const existingTimeout = expirations.get(key);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          expirations.delete(key);
        }
        return testStore.delete(key) ? 1 : 0;
      },
      connect: async () => ({}),
      quit: async () => {
        testStore.clear();
        for (const timeout of expirations.values()) {
          clearTimeout(timeout);
        }
        expirations.clear();
      },
      on: () => ({}),
    }
  : createClient({
      username: env.REDIS_USERNAME,
      password: env.REDIS_PASSWORD,
      socket: {
        host: env.REDIS_HOST,
        port: +env.REDIS_PORT,
      },
    });

if (!isTest) {
  client.on('error', (err) => console.error('Redis Client Error', err));
  await client.connect();
}
