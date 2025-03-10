import { describe, expect, it, beforeEach } from 'bun:test';
import { redisJsonOps } from '../utils';
import { type HCode } from '@/server/secure/resource';
import { type RedisJSON } from '@redis/json/dist/commands';
import { client } from '../index';

// Type assertion to ensure HCode is compatible with RedisJSON
const testHCode: HCode & RedisJSON = {
  hkey: 'test-hkey-123',
  grp: 'test-group',
  nonce: 'test-nonce-456',
  sha: 'test-sha-789'
};

describe('Redis JSON Operations', () => {
  const testKey = 'test:hcode';

  beforeEach(async () => {
    await client.del(testKey);
  });

  it('should set and get JSON data', async () => {
    await redisJsonOps.setJson<typeof testHCode>(testKey, testHCode);
    const result = await redisJsonOps.getJson<typeof testHCode>(testKey);
    expect(result).toEqual(testHCode);
  });

  it('should handle expiration of JSON data', async () => {
    await redisJsonOps.setJson<typeof testHCode>(testKey, testHCode, 1);

    // Verify data exists
    let result = await redisJsonOps.getJson<typeof testHCode>(testKey);
    expect(result).toEqual(testHCode);

    // Wait for expiration
    await new Promise(resolve => setTimeout(resolve, 1100));

    // Verify data is gone
    result = await redisJsonOps.getJson<typeof testHCode>(testKey);
    expect(result).toBeNull();
  });

  it('should delete JSON data', async () => {
    await redisJsonOps.setJson<typeof testHCode>(testKey, testHCode);
    await redisJsonOps.deleteKey(testKey);
    const result = await redisJsonOps.getJson<typeof testHCode>(testKey);
    expect(result).toBeNull();
  });

  it('should return null for non-existent key', async () => {
    const result = await redisJsonOps.getJson<typeof testHCode>('non:existent:key');
    expect(result).toBeNull();
  });
});
