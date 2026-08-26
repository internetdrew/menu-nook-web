import type { APIRoute } from "astro";
import { fetchPublishedMenuSitemapEntries } from "@/lib/publicMenu";

export const prerender = false;

const defaultSiteUrl = "https://menunook.com";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET: APIRoute = async ({ site }) => {
  const entries = await fetchPublishedMenuSitemapEntries();
  const origin = site ?? new URL(defaultSiteUrl);
  const urls = entries
    .map((entry) => {
      const loc = new URL(`/m/${entry.slug}`, origin).href;
      const lastmod = new Date(entry.created_at).toISOString();

      return [
        "  <url>",
        `    <loc>${escapeXml(loc)}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return new Response(
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      urls,
      "</urlset>",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    },
  );
};
