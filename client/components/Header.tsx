import { cn } from "@/lib/utils";

export default function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur dark:border-slate-800",
        className,
      )}
    >
      <div className="container flex h-14 items-center justify-between px-8">
        <a href="https://firous.com/" className="flex items-center gap-4 group cursor-pointer mr-auto">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets%2F99359db9c3f34a9baeeecb2b0172a938%2Fc9bd738425fe4572b62a0f2e5e955d5c"
            className="h-7 w-7 object-cover rounded"
            alt="Al Firous logo"
          />
          <span className="font-semibold tracking-tight group-hover:text-primary transition-colors flex flex-row">
            <div className="text-2xl leading-8">Al Firous</div>
            <br />
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a
            href="https://firous.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground cursor-pointer"
          >
            Website
          </a>
          <a
            href="https://firous.com/blog"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground cursor-pointer"
          >
            Blog
          </a>
        </nav>
      </div>
    </header>
  );
}
