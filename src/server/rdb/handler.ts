import redis from "@/lib/redis";
import type { ActivationDel, ActivationGet, ActivationSet, ExampleValueType } from "./schema";


const rdbExampleSet = async (data: ExampleValueType) => {
  await redis.json.set(data.key, data.path, data);
  await redis.expire(data.key, Number(data.ttl));
};

const activationSet = async (data: ActivationSet) => {
  await redis.json.set(data.key, data.path, data);
  await redis.expire(data.key, Number(data.ttl));
}

const activationGet = async ({key, path}: ActivationGet) =>
  await redis.json.get(key, path)

const activationDel = async ({key}: ActivationDel) =>
  await redis.json.del(key)

export const rdb = {
  set: {
    rdbExampleSet,
    activationSet,
  },
  get: {
    activationGet,
  },
  del: {
    activationDel,
  },
}
