import { useQuery } from "@tanstack/react-query";
import type { CollectionsResponse, RaindropsResponse } from "@shared/api";

export function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const r = await fetch("/api/raindrop/collections");
      const data = (await r.json()) as CollectionsResponse;
      return data.items;
    },
  });
}

export interface UseRaindropsParams {
  collectionId: number; // 0 means All
  search: string;
  sort: "-created" | "-lastUpdate";
  page: number;
  perPage: number;
}

export function useRaindrops(params: UseRaindropsParams) {
  const { collectionId, search, sort, page, perPage } = params;
  return useQuery({
    queryKey: ["raindrops", collectionId, search, sort, page, perPage],
    queryFn: async () => {
      const sp = new URLSearchParams();
      if (collectionId !== undefined)
        sp.set("collection", String(collectionId));
      if (search) sp.set("search", search);
      if (sort) sp.set("sort", sort);
      sp.set("page", String(page));
      sp.set("perPage", String(perPage));
      const r = await fetch(`/api/raindrop/raindrops?${sp.toString()}`);
      const data = (await r.json()) as RaindropsResponse;
      return data;
    },
  });
}
