import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://vadensoftware.com/sitemap.xml",
    host: "https://vadensoftware.com",
  };
}
