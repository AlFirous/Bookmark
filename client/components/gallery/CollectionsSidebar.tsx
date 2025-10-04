import { useCollections } from "@/hooks/use-raindrop";
import { cn } from "@/lib/utils";

interface Props {
  activeId: number;
  onSelect: (id: number) => void;
}

export default function CollectionsSidebar({ activeId, onSelect }: Props) {
  const { data: collections, isLoading } = useCollections();

  return (
    <aside className="w-full md:w-64 shrink-0 border-r bg-card/30">
      <div className="p-4">
        <h2 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground">
          Collections
        </h2>
        <ul className="space-y-1">
          {(collections ?? [{ _id: -1, title: "All" }]).map((c) => (
            <li key={c._id}>
              <button
                onClick={() => onSelect(c._id)}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm flex items-center justify-between",
                  activeId === c._id
                    ? "bg-primary/10 text-foreground ring-1 ring-primary/30"
                    : "hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <span className="truncate">{c.title}</span>
                {typeof c.count === "number" && (
                  <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                    {isLoading ? "…" : c.count}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
