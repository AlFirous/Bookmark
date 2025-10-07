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
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between self-center w-auto">
      <div className="relative w-auto flex-1">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search links, tags, domains…"
          className={cn(
            "w-full h-9 self-stretch overflow-hidden rounded-md border bg-background px-3 text-sm outline-none dark:border-slate-800",
            "focus:ring-2 focus:ring-ring",
          )}
        />
      </div>
      <div className="flex items-center gap-2 justify-end">
        <select
          value={collectionId}
          onChange={(e) => onCollectionChange(Number(e.target.value))}
          className="h-9 rounded-md border bg-background px-3 text-sm w-auto flex-none dark:border-slate-800"
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
          className="h-9 rounded-md border bg-background px-3 text-sm w-auto flex-none dark:border-slate-800"
        >
          <option value="-created">Newest</option>
          <option value="-lastUpdate">Recently updated</option>
        </select>
        <div className="inline-flex rounded-md border p-0.5 self-stretch h-9 dark:border-slate-800">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onViewChange("grid")}
            aria-label="Grid view"
            className={cn(
              "h-auto w-auto aspect-square self-stretch rounded-[3px]",
              view === "grid" ? "bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50" : "",
            )}
          >
            <Grid3X3 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onViewChange("list")}
            aria-label="List view"
            className={cn(
              "h-auto w-auto aspect-square self-stretch rounded-[3px]",
              view === "list" ? "bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50" : "",
            )}
          >
            <List className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
