import type { RequestHandler } from "express";
import type {
  CollectionsResponse,
  RaindropsResponse,
  RaindropItem,
} from "@shared/api";

const RAINDROP_API = "https://api.raindrop.io/rest/v1";
const TOKEN = process.env.RAINDROP_TOKEN;

const demoCollections: CollectionsResponse = {
  items: [
    { _id: 0, title: "All", count: 6 },
    { _id: 101, title: "Inspiration", count: 3 },
    { _id: 102, title: "Engineering", count: 2 },
    { _id: 103, title: "Design Systems", count: 1 },
  ],
};

const demoRaindrops: RaindropItem[] = [
  {
    _id: 1,
    link: "https://developer.raindrop.io/",
    title: "Raindrop.io Developer Docs",
    excerpt: "REST API for bookmarks, collections, and highlights.",
    domain: "developer.raindrop.io",
    cover:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
    tags: ["api", "docs"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 102 },
    type: "link",
  },
  {
    _id: 2,
    link: "https://tailwindcss.com/",
    title: "Tailwind CSS",
    excerpt: "Rapidly build modern websites without ever leaving your HTML.",
    domain: "tailwindcss.com",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    tags: ["css", "utility"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 101 },
    type: "link",
  },
  {
    _id: 3,
    link: "https://react.dev/",
    title: "React",
    excerpt: "The library for web and native user interfaces.",
    domain: "react.dev",
    cover:
      "https://images.unsplash.com/photo-1554232456-8727aae0cfa4?q=80&w=800&auto=format&fit=crop",
    tags: ["react", "javascript"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 102 },
    type: "link",
  },
  {
    _id: 4,
    link: "https://www.radix-ui.com/",
    title: "Radix UI",
    excerpt:
      "Unstyled, accessible UI components for building high‑quality design systems.",
    domain: "radix-ui.com",
    cover:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
    tags: ["ui", "accessibility"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 103 },
    type: "link",
  },
  {
    _id: 5,
    link: "https://news.ycombinator.com/",
    title: "Hacker News",
    excerpt:
      "Social news website focusing on computer science and entrepreneurship.",
    domain: "news.ycombinator.com",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop",
    tags: ["news"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 101 },
    type: "link",
  },
  {
    _id: 6,
    link: "https://vercel.com/",
    title: "Vercel",
    excerpt: "Frontend cloud for the best developer experience.",
    domain: "vercel.com",
    cover:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=800&auto=format&fit=crop",
    tags: ["hosting", "edge"],
    created: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
    collection: { $id: 101 },
    type: "link",
  },
];

export const getCollections: RequestHandler = async (_req, res) => {
  if (!TOKEN) {
    return res.json(demoCollections);
  }
  try {
    const [collectionsRes, allCountRes] = await Promise.all([
      fetch(`${RAINDROP_API}/collections`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }),
      fetch(`${RAINDROP_API}/raindrops/0?page=0&perpage=1`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }),
    ]);
    const collections = (await collectionsRes.json()) as CollectionsResponse;
    const allCountData = (await allCountRes.json()) as { count?: number };
    const total =
      typeof allCountData.count === "number" ? allCountData.count : undefined;

    const items = [
      { _id: 0, title: "All collections", count: total },
      ...((collections.items ?? []).map((c: any) => ({
        _id: c._id,
        title: c.title,
        count: c.count,
      })) as any[]),
    ];

    res.json({ items });
  } catch (e) {
    res.status(500).json({ items: [] });
  }
};

export const getRaindrops: RequestHandler = async (req, res) => {
  const collectionId = Number(req.query.collection);
  const isAll = !Number.isFinite(collectionId) || collectionId <= 0; // 0 or missing = All
  const search = (req.query.search as string) || "";
  const sort = (req.query.sort as string) || "-created"; // Raindrop uses -created, -lastUpdate
  const page = Number(req.query.page ?? 0);
  const perPage = Number(req.query.perPage ?? 50);
  const fetchAll = String(req.query.all ?? "false").toLowerCase() === "true";

  if (!TOKEN) {
    let items = demoRaindrops;
    if (!isAll) {
      items = items.filter((i) => i.collection?.$id === collectionId);
    }
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          (i.excerpt?.toLowerCase().includes(q) ?? false) ||
          (i.tags ?? []).some((t) => t.toLowerCase().includes(q)) ||
          (i.domain ?? "").toLowerCase().includes(q),
      );
    }
    if (sort === "-created") {
      items = [...items].sort((a, b) =>
        (b.created ?? "").localeCompare(a.created ?? ""),
      );
    } else if (sort === "-lastUpdate") {
      items = [...items].sort((a, b) =>
        (b.lastUpdate ?? "").localeCompare(a.lastUpdate ?? ""),
      );
    }
    const total = items.length;
    const paged = fetchAll
      ? items
      : items.slice(page * perPage, page * perPage + perPage);
    const response: RaindropsResponse = {
      items: paged,
      count: paged.length,
      total,
      page,
      perPage,
    };
    return res.json(response);
  }

  try {
    const idPath = isAll ? "raindrops/0" : `raindrops/${collectionId}`;
    const baseParams = new URLSearchParams();
    if (search) baseParams.set("search", search);
    if (sort) baseParams.set("sort", sort);

    if (fetchAll) {
      let allItems: RaindropItem[] = [];
      let total = 0;
      let p = 0;
      const maxPages = 500; // safety cap
      while (p < maxPages) {
        const sp = new URLSearchParams(baseParams);
        sp.set("page", String(p));
        sp.set("perpage", String(perPage));
        const r = await fetch(`${RAINDROP_API}/${idPath}?${sp.toString()}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        const data = (await r.json()) as RaindropsResponse;
        const batch = data.items ?? [];
        if (total === 0 && typeof data.count === "number") total = data.count;
        allItems = allItems.concat(batch);
        if (batch.length < perPage) break;
        if (total && allItems.length >= total) break;
        p += 1;
      }
      const totalFinal = total || allItems.length;
      return res.json({
        items: allItems,
        count: allItems.length,
        total: totalFinal,
      });
    }

    const sp = new URLSearchParams(baseParams);
    sp.set("page", String(page));
    sp.set("perpage", String(perPage));
    const r = await fetch(`${RAINDROP_API}/${idPath}?${sp.toString()}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });
    const data = (await r.json()) as RaindropsResponse;
    res.json({
      items: data.items ?? [],
      count: data.items?.length ?? 0,
      total: data.count ?? data.items?.length ?? 0,
      page,
      perPage,
    });
  } catch (e) {
    res
      .status(500)
      .json({ items: [], count: 0, total: 0, page: 0, perPage: 0 });
  }
};
