import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur",
        className,
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <span className="inline-grid size-7 place-items-center rounded-md bg-primary text-primary-foreground font-bold">
            R
          </span>
          <span className="font-semibold tracking-tight group-hover:text-primary transition-colors">
            RainGallery
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://developer.raindrop.io/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Docs
          </a>
          <a
            href="https://raindrop.io/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            Raindrop.io
          </a>
        </nav>
      </div>
    </header>
  );
}
