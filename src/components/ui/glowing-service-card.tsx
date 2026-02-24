import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  title: string;
  description: string;
}

interface GlowingServiceCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  services: ServiceItem[];
  accentColor: string;
  accentColorLight: string;
  isNegative: boolean;
  className?: string;
}

function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export const GlowingServiceCard = memo(({
  icon,
  title,
  subtitle,
  services,
  accentColor,
  accentColorLight,
  isNegative,
  className,
}: GlowingServiceCardProps) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  const animateAngle = useCallback((
    el: HTMLDivElement, from: number, to: number, duration: number
  ) => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      el.style.setProperty("--start", String(from + (to - from) * easeOutQuint(p)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleMove = useCallback((e?: MouseEvent | { x: number; y: number }) => {
    if (!outerRef.current || !glowRef.current) return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    animFrameRef.current = requestAnimationFrame(() => {
      const outer = outerRef.current;
      const glowEl = glowRef.current;
      if (!outer || !glowEl) return;

      const { left, top, width, height } = outer.getBoundingClientRect();
      const mx = e?.x ?? lastPos.current.x;
      const my = e?.y ?? lastPos.current.y;
      if (e) lastPos.current = { x: mx, y: my };

      const cx = left + width / 2;
      const cy = top + height / 2;
      const proximity = 80;
      const active =
        mx > left - proximity && mx < left + width + proximity &&
        my > top - proximity && my < top + height + proximity;

      glowEl.style.setProperty("--active", active ? "1" : "0");
      if (!active) return;

      const current = parseFloat(glowEl.style.getPropertyValue("--start")) || 0;
      const target = (180 * Math.atan2(my - cy, mx - cx)) / Math.PI + 90;
      const diff = ((target - current + 180) % 360) - 180;
      animateAngle(glowEl, current, current + diff, 1200);
    });
  }, [animateAngle]);

  useEffect(() => {
    const onPointer = (e: PointerEvent) => handleMove(e);
    const onScroll = () => handleMove();
    document.body.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleMove]);

  const glowColor = isNegative ? "#ffffff" : "#000000";
  const hoverBorderColor = isNegative ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)";
  const idleBorderColor  = isNegative ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  return (
    <div
      ref={outerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative rounded-[1.25rem] p-2 md:rounded-[1.5rem] md:p-3 transition-all duration-200",
        className
      )}
      style={{
        border: `0.75px solid ${hovered ? hoverBorderColor : idleBorderColor}`,
      }}
    >
      {/* Conic glow border layer */}
      <div
        ref={glowRef}
        style={{
          "--spread": "45",
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": "2px",
          "--repeating-conic-gradient-times": "5",
          "--gradient": `repeating-conic-gradient(
            from 236.84deg at 50% 50%,
            ${glowColor},
            ${glowColor} calc(25% / var(--repeating-conic-gradient-times))
          )`,
        } as React.CSSProperties}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      >
        <div className={cn(
          "glow rounded-[inherit]",
          'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
          "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
          "after:[background:var(--gradient)] after:[background-attachment:fixed]",
          "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
          "after:[mask-clip:padding-box,border-box]",
          "after:[mask-composite:intersect]",
          "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
        )} />
      </div>

      {/* Inner card */}
      <div className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-xl border-[0.75px] p-6 shadow-sm md:p-6",
        isNegative
          ? "bg-[#0a0a0a] border-white/10 shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]"
          : "bg-[#E8E7E3] border-black/10"
      )}>
        {/* Static ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: isNegative
              ? "radial-gradient(ellipse 80% 35% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 60%)"
              : "radial-gradient(ellipse 80% 35% at 50% 0%, rgba(0,0,0,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full gap-0">
          {/* Icon */}
          <div className="mb-6">
            <div
              className={cn(
                "w-fit rounded-lg border-[0.75px] p-2 mb-5",
                isNegative
                  ? "border-white/20 bg-[#0a0a0a]"
                  : "border-black/20 bg-[#E8E7E3]"
              )}
            >
              <div className={isNegative ? "text-[#E8E7E3]" : "text-[#0a0a0a]"}>
                {icon}
              </div>
            </div>

            {/* ── TITLE: адаптивный размер, не переносится ── */}
            <h3
              className={cn(
                "font-bold mb-1 leading-none",
                isNegative ? "text-white" : "text-black"
              )}
              style={{
                fontFamily: "UnifixSP, sans-serif",
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {title}
            </h3>
            <p className={cn(
              "text-sm font-medium",
              isNegative ? "text-white/40" : "text-black/40"
            )}>
              {subtitle}
            </p>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mb-6 transition-all duration-400"
            style={{
              background: hovered
                ? `linear-gradient(90deg, transparent, ${isNegative ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)"}, transparent)`
                : isNegative ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            }}
          />

          {/* Services list */}
          <ul className="flex flex-col gap-4 flex-1">
            {services.map((service, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="mt-[6px] flex-shrink-0 w-[6px] h-[6px] rounded-full"
                  style={{
                    backgroundColor: isNegative ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                  }}
                />
                <div>
                  <p className={cn(
                    "text-sm font-semibold mb-0.5 leading-snug",
                    isNegative ? "text-white/90" : "text-black/90"
                  )}>
                    {service.title}
                  </p>
                  <p className={cn(
                    "text-xs leading-relaxed",
                    isNegative ? "text-white/45" : "text-black/50"
                  )}>
                    {service.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

GlowingServiceCard.displayName = "GlowingServiceCard";