import type { RaindropItem } from "@shared/api";
import Card from "./Card";

export default function Grid({
  items,
  variant,
}: {
  items: RaindropItem[];
  variant: "grid" | "list";
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
        No links match your filters.
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="grid gap-3">
        {items.map((it) => (
          <Card key={it._id} item={it} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((it) => (
        <Card key={it._id} item={it} />
      ))}
    </div>
  );
}
