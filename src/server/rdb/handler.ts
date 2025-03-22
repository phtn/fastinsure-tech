import type { ExampleValueType, ActivationType } from "./schema";
import redis from "@/lib/redis/upstash";


const rdbExampleSet = async (data: ExampleValueType) => {
  await redis.json.set(data.key, data.path, data);
  await redis.expire(data.key, data.ttl);
};

const activationSet = async (data: ActivationType) => {
  await redis.json.set(data.key, data.path, data);
  await redis.expire(data.key, data.ttl);
}

export const rdb = {
  set: {
    rdbExampleSet,
    activationSet,
  }
}
