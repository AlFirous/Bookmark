import CollectionsSidebar from "@/components/gallery/CollectionsSidebar";
import Toolbar from "@/components/gallery/Toolbar";
import Grid from "@/components/gallery/Grid";
import { useState } from "react";
import { useRaindrops } from "@/hooks/use-raindrop";

export default function Index() {
  const [collectionId, setCollectionId] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"-created" | "-lastUpdate">("-created");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(0);
  const [perPage] = useState(24);

  const { data, isLoading } = useRaindrops({
    collectionId,
    search,
    sort,
    page,
    perPage,
  });
  const items = data?.items ?? [];
  const total = data?.total ?? items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <main className="container py-6 space-y-4">
        <section className="space-y-4">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold tracking-tight mx-auto">
              Bookmarks
            </h1>
            <p className="text-sm text-muted-foreground mx-auto text-center">
              Browse and search semi-curated links from the internet
            </p>
          </div>
          <Toolbar
            view={view}
            onViewChange={setView}
            search={search}
            onSearch={(v) => {
              setSearch(v);
              setPage(0);
            }}
            sort={sort}
            onSort={(v) => {
              setSort(v);
              setPage(0);
            }}
            collectionId={collectionId}
            onCollectionChange={(id) => {
              setCollectionId(id);
              setPage(0);
            }}
          />
          {isLoading ? (
            <div className="rounded-md border p-8 text-center text-sm text-muted-foreground">
              Loading…
            </div>
          ) : (
            <>
              <Grid items={items} variant={view} />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>{`${total} items`}</div>
                <div className="inline-flex items-center gap-px rounded-md border overflow-hidden">
                  <button
                    className="px-3 h-9 bg-background disabled:opacity-50"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </button>
                  <div className="px-3 h-9 grid place-items-center bg-muted/40">
                    {page + 1} / {totalPages}
                  </div>
                  <button
                    className="px-3 h-9 bg-background disabled:opacity-50"
                    onClick={() =>
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={page + 1 >= totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
