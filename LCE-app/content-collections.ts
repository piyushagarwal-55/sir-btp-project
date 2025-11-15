import { defineCollection, defineConfig } from "@content-collections/core";
// import { z } from "zod"; // Ensure Zod is imported

const posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    author: z.string(),
    summary: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    slug: z.string(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [posts],
});
