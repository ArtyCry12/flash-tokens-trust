export default function Loading() {
  return (
    <div
      className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 bg-black text-white"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
        <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--gw-accent,#2997ff)]" />
      </div>
      <p className="text-sm text-white/60">GELANDEWAGEN</p>
    </div>
  );
}
