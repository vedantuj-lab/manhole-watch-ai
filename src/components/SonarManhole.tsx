import { useEffect, useRef, useState } from "react";
import manhole from "@/assets/manhole-cover.png";

/**
 * Signature element: wet 3D manhole cover with a teal sonar ring pulsing
 * around its rim. Parallax tilt follows pointer (desktop) / device tilt.
 */
export function SonarManhole({ size = 460 }: { size?: number }) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({ x: ((e.clientY - cy) / cy) * -7, y: ((e.clientX - cx) / cx) * 9 });
    };
    const onOrient = (e: DeviceOrientationEvent) => {
      setTilt({
        x: Math.max(-8, Math.min(8, ((e.beta ?? 0) - 40) / 5)),
        y: Math.max(-10, Math.min(10, (e.gamma ?? 0) / 4)),
      });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("deviceorientation", onOrient);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative mx-auto grid place-items-center"
      style={{ width: size, height: size, perspective: "1100px" }}
      aria-hidden="true"
    >
      {/* wet asphalt pool */}
      <div
        className="absolute inset-[6%] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent-teal) 26%, transparent), transparent 70%)",
        }}
      />
      <div
        className="relative transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${58 + tilt.x}deg) rotateZ(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* sonar rings */}
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="animate-sonar absolute inset-0 rounded-full border-2"
            style={{
              borderColor: "var(--accent-teal)",
              boxShadow: "0 0 24px -2px var(--accent-teal)",
              animationDelay: `${i}s`,
            }}
          />
        ))}
        <img
          src={manhole}
          alt="ManholeGuard monitored manhole cover"
          width={1024}
          height={1024}
          className="relative block rounded-full"
          style={{
            width: size * 0.78,
            height: size * 0.78,
            filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.65)) contrast(1.05)",
          }}
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow: "inset 0 0 60px -10px color-mix(in oklab, var(--accent-teal) 60%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

/** Tiny spinning motif reused in loading + empty states. */
export function SonarMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="animate-sonar absolute inset-0 rounded-full border"
        style={{ borderColor: "var(--accent-teal)" }}
      />
      <span
        className="rounded-full border-2 border-dashed"
        style={{
          width: size * 0.62,
          height: size * 0.62,
          borderColor: "var(--accent-teal)",
          animation: "spin 7s linear infinite",
        }}
      />
    </span>
  );
}
