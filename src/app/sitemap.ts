import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kanvaboard.addoxy.me",
      lastModified: new Date(),
    },
    {
      url: "https://kanvaboard.addoxy.me/projects",
      lastModified: new Date(),
    },
    {
      url: "https://kanvaboard.addoxy.me/templates",
      lastModified: new Date(),
    },
    {
      url: "https://kanvaboard.addoxy.me/preferences",
      lastModified: new Date(),
    },
    {
      url: "https://kanvaboard.addoxy.me/sign-in",
      lastModified: new Date(),
    },
  ];
}
