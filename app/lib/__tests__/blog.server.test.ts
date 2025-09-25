/* @vitest-environment node */

import { promises as fs } from "node:fs";
import { fileURLToPath } from "node:url";
import { LRUCache } from "lru-cache";
import type { BlogPost } from "~/lib/types";
import { afterEach, describe, expect, it, vi } from "vitest";

const STATIC_DATA_FILE = fileURLToPath(
  new URL("../static-blog-data.ts", import.meta.url),
);
const BLOG_LOCAL_MODULE = new URL(
  "../blog.local.server.ts",
  import.meta.url,
).href;

const ORIGINAL_VERCEL_ENV = process.env.VERCEL_ENV;

async function writeStaticData(posts: BlogPost[]) {
  const moduleSource = `import type { BlogPost } from "./types";\n\nexport const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};\n`;
  await fs.writeFile(STATIC_DATA_FILE, moduleSource, "utf-8");
}

afterEach(async () => {
  process.env.VERCEL_ENV = ORIGINAL_VERCEL_ENV;
  vi.clearAllMocks();
  await vi.resetModules();
  await fs.rm(STATIC_DATA_FILE, { force: true });
});

describe("getBlogPosts", () => {
  it("loads static posts in production and caches the result", async () => {
    process.env.VERCEL_ENV = "production";
    const mockPosts: BlogPost[] = [
      {
        slug: "introducing-neofactory",
        metadata: {
          title: "Introducing Neofactory",
          publishedAt: "2023-01-01",
          summary: "Launch announcement",
          tag: "announcement",
          author: "rob",
        },
        html: "<p>Hello world</p>",
      },
    ];

    await writeStaticData(mockPosts);

    const { getBlogPosts } = await import("../blog.server");

    const firstResult = await getBlogPosts();
    const secondResult = await getBlogPosts();

    expect(firstResult).toEqual(mockPosts);
    expect(secondResult).toBe(firstResult);
  });

  it("defers to the local blog loader when not in production", async () => {
    process.env.VERCEL_ENV = "preview";
    const mockPosts: BlogPost[] = [
      {
        slug: "deep-dive",
        metadata: {
          title: "Deep dive",
          publishedAt: "2023-02-15",
          summary: "Technical write-up",
          tag: "engineering",
          author: "brad",
        },
        html: "<p>Content</p>",
      },
    ];
    const getLocalPosts = vi.fn().mockResolvedValue(mockPosts);

    vi.doMock(BLOG_LOCAL_MODULE, () => ({ getBlogPosts: getLocalPosts }));

    const { getBlogPosts } = await import("../blog.server");
    const posts = await getBlogPosts();

    expect(getLocalPosts).toHaveBeenCalledTimes(1);
    expect(posts).toEqual(mockPosts);
  });
});

describe("getBlogPost", () => {
  it("caches individual posts in production", async () => {
    process.env.VERCEL_ENV = "production";
    const mockPosts: BlogPost[] = [
      {
        slug: "introducing-neofactory",
        metadata: {
          title: "Introducing Neofactory",
          publishedAt: "2023-01-01",
          summary: "Launch announcement",
          tag: "announcement",
          author: "rob",
        },
        html: "<p>Hello world</p>",
      },
    ];

    await writeStaticData(mockPosts);

    const blogModule = await import("../blog.server");
    const cacheGet = vi.spyOn(LRUCache.prototype, "get");
    const cacheSet = vi.spyOn(LRUCache.prototype, "set");

    const first = await blogModule.getBlogPost("introducing-neofactory");
    const second = await blogModule.getBlogPost("introducing-neofactory");

    expect(first).toEqual(mockPosts[0]);
    expect(second).toBe(first);
    expect(cacheGet).toHaveBeenCalledTimes(2);
    expect(cacheSet).toHaveBeenCalledTimes(1);
  });

  it("returns undefined for missing slugs", async () => {
    process.env.VERCEL_ENV = "production";
    const mockPosts: BlogPost[] = [
      {
        slug: "existent",
        metadata: {
          title: "Existing",
          publishedAt: "2023-01-02",
          summary: "Existing post",
          tag: "general",
          author: "brad",
        },
        html: "<p>Exists</p>",
      },
    ];

    await writeStaticData(mockPosts);

    const blogModule = await import("../blog.server");

    await expect(blogModule.getBlogPost("missing")).resolves.toBeUndefined();
  });
});
