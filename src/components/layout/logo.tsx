import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-1 group">
      <span className="text-2xl font-black tracking-tight">
        <span className="text-accent">UKU</span>
        <span className="text-foreground">X</span>
        <span className="text-foreground">BOX</span>
      </span>
      <div className="flex gap-0.5 ml-1">
        <div className="w-2.5 h-5 bg-accent rotate-12 rounded-sm" />
        <div className="w-2.5 h-5 bg-foreground/60 rotate-12 rounded-sm -ml-1" />
        <div className="w-2.5 h-5 bg-foreground/30 rotate-12 rounded-sm -ml-1" />
      </div>
    </Link>
  );
}
