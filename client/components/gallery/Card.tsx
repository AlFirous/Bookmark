import type { RaindropItem } from "@shared/api";
import { Badge } from "@/components/ui/badge";

function getFavicon(domain?: string) {
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(domain)}`;
}

export default function Card({
  item,
  variant = "grid",
}: {
  item: RaindropItem;
  variant?: "grid" | "list";
}) {
  const url = new URL(item.link);
  const domain = item.domain || url.hostname;

  if (variant === "list") {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="group grid grid-cols-[96px_1fr] gap-4 rounded-lg border bg-card/50 p-3 hover:shadow-md transition-shadow"
      >
        {item.cover ? (
          <img
            src={item.cover}
            alt=""
            className="h-24 w-24 rounded object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded bg-muted" />
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {domain && (
              <img src={getFavicon(domain)} alt="" className="h-3.5 w-3.5" />
            )}
            <span className="truncate">{domain}</span>
          </div>
          <div className="mt-1 truncate font-medium group-hover:text-primary">
            {item.title}
          </div>
          {item.excerpt && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {item.excerpt}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 4).map((t) => (
                <Badge key={t} variant="secondary" className="px-2 py-0.5">
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </a>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group overflow-hidden rounded-lg border bg-card/50 hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/10] w-full bg-muted">
        {item.cover && (
          <img src={item.cover} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="p-3">
        <div className="mt-1 truncate font-medium group-hover:text-primary">
          {item.title}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {domain && (
            <img src={getFavicon(domain)} alt="" className="h-3.5 w-3.5" />
          )}
          <span className="truncate">{domain}</span>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((t) => (
              <Badge key={t} variant="secondary" className="px-2 py-0.5">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
