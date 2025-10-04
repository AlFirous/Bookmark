/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Raindrop-like types used by the link gallery
export interface RaindropCollection {
  _id: number;
  title: string;
  count?: number;
  cover?: string[];
  slug?: string;
  public?: boolean;
}

export interface RaindropItem {
  _id: number;
  link: string;
  title: string;
  excerpt?: string;
  domain?: string;
  cover?: string; // preview image
  tags?: string[];
  created?: string;
  lastUpdate?: string;
  collection?: { $id: number };
  type?: string; // article, link, video...
}

export interface CollectionsResponse {
  items: RaindropCollection[];
}

export interface RaindropsResponse {
  items: RaindropItem[];
  count?: number; // items in this response page
  total?: number; // total items matching query
  page?: number;
  perPage?: number;
}
