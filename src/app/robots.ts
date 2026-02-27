import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/icon.svg", "/_next/static/", "/_next/image/"],
        disallow: ["/login", "/dashboard", "/share", "/api"],
      },
    ],
    sitemap: "https://cmdblock.tech/sitemap.xml",
  };
}
