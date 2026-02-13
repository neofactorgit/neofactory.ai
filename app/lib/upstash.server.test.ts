import { beforeAll, describe, expect, it } from "vitest";

const hasUpstashEnv =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

const suite = hasUpstashEnv ? describe : describe.skip;

suite("upstash redis", () => {
  let redis: Awaited<ReturnType<typeof importRedis>>["redis"];

  async function importRedis() {
    const mod = await import("~/lib/upstash.server");
    return mod;
  }

  beforeAll(async () => {
    const module = await importRedis();
    redis = module.redis;
  });

  it("stores and retrieves values", async () => {
    const key = `test:upstash:${Date.now()}:${Math.random().toString(36).slice(2)}`;
    const value = JSON.stringify({ timestamp: Date.now() });

    await redis.set(key, value, { ex: 60 });

    const stored = await redis.get<string>(key);
    expect(stored).toBe(value);

    await redis.del(key);
    const removed = await redis.get<string>(key);
    expect(removed).toBeNull();
  });
});
