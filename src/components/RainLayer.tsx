import { useEffect, useRef } from "react";

/** GPU-cheap canvas rain. Capped particle count, disabled for reduced motion. */
export function RainLayer({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 70 : 160;
    const drops = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 8 + Math.random() * 22,
      speed: 0.004 + Math.random() * 0.01,
      o: 0.06 + Math.random() * 0.16,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const d of drops) {
        d.y += d.speed;
        d.x += d.speed * 0.18;
        if (d.y > 1.1) {
          d.y = -0.1;
          d.x = Math.random();
        }
        const px = d.x * w;
        const py = d.y * h;
        ctx.strokeStyle = `rgba(200, 235, 245, ${d.o})`;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px - d.len * 0.18, py + d.len);
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
