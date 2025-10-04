import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { List, Grid3X3 } from "lucide-react";
import { useCollections } from "@/hooks/use-raindrop";

interface Props {
  view: "grid" | "list";
  onViewChange: (v: "grid" | "list") => void;
  search: string;
  onSearch: (v: string) => void;
  sort: "-created" | "-lastUpdate";
  onSort: (v: "-created" | "-lastUpdate") => void;
  collectionId: number;
  onCollectionChange: (id: number) => void;
}

export default function Toolbar({
  view,
  onViewChange,
  search,
  onSearch,
  sort,
  onSort,
  collectionId,
  onCollectionChange,
}: Props) {
  const { data: collections } = useCollections();
  const items =
    collections && collections.length > 0
      ? collections
      : [{ _id: 0, title: "All collections" } as any];
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search links, tags, domains…"
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none",
            "focus:ring-2 focus:ring-ring",
          )}
        />
      </div>
      <div className="flex items-center gap-2">
        <select
          value={collectionId}
          onChange={(e) => onCollectionChange(Number(e.target.value))}
          className="h-9 rounded-md border bg-background px-3 text-sm min-w-40"
        >
          {items.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
              {typeof c.count === "number" ? ` (${c.count})` : ""}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as "-created" | "-lastUpdate")}
          className="h-9 rounded-md border bg-background px-3 text-sm"
        >
          <option value="-created">Newest</option>
          <option value="-lastUpdate">Recently updated</option>
        </select>
        <div className="ml-1 inline-flex rounded-md border p-0.5">
          <Button
            size="icon"
            variant={view === "grid" ? "default" : "ghost"}
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
          >
            <Grid3X3 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant={view === "list" ? "default" : "ghost"}
            onClick={() => onViewChange("list")}
            aria-label="List view"
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
