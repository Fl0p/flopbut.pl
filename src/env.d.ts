/// <reference types="astro/client" />

/**
 * Minimal typing for the single Cloudflare module this project imports.
 *
 * `wrangler types` would generate the full runtime declarations, but they include a global
 * `ImageMetadata` interface for the Images API which collides with Astro's own type of the
 * same name and breaks every <Image> usage. Only the contact endpoint needs anything from
 * the worker runtime, and all it reads are string secrets.
 */
declare module 'cloudflare:workers' {
  export const env: Record<string, string | undefined>;
}
