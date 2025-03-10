import { useState, useCallback } from 'react';
import { redisJsonOps } from '@/lib/redis/utils';
import { type RedisJSON } from '@redis/json/dist/commands';

export function useRedisJson<T extends RedisJSON>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const setJson = useCallback(async (key: string, value: T, expirationSeconds?: number) => {
    setLoading(true);
    setError(null);
    try {
      await redisJsonOps.setJson<T>(key, value, expirationSeconds);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to set JSON in Redis'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getJson = useCallback(async (key: string): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await redisJsonOps.getJson<T>(key);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to get JSON from Redis'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteKey = useCallback(async (key: string) => {
    setLoading(true);
    setError(null);
    try {
      await redisJsonOps.deleteKey(key);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete key from Redis'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    setJson,
    getJson,
    deleteKey,
    loading,
    error
  };
}
