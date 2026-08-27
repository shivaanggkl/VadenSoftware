import type { MetadataRoute } from "next";

const baseUrl = "https://vadensoftware.com";
const routes = ["", "/about", "/products", "/support", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-08-01"),
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : route === "/products" ? 0.9 : 0.7,
  }));
}
