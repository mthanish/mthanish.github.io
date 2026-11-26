"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

interface Obstacle {
  pos: number; // 0..1 along scroll
  kind: "rack" | "platform" | "drone";
  label: string;
}

const OBSTACLES: Obstacle[] = [
  { pos: 0.11, kind: "rack", label: "TCP" },
  { pos: 0.22, kind: "platform", label: "AES" },
  { pos: 0.34, kind: "rack", label: "GO" },
  { pos: 0.44, kind: "drone", label: "WS" },
  { pos: 0.54, kind: "platform", label: "API" },
  { pos: 0.65, kind: "rack", label: "PR22" },
  { pos: 0.75, kind: "drone", label: "ML" },
  { pos: 0.86, kind: "platform", label: "VTU" },
  { pos: 0.94, kind: "rack", label: "EOF" },
];

const ORB_POSITIONS = [0.07, 0.17, 0.28, 0.39, 0.49, 0.6, 0.7, 0.81, 0.91, 0.98];

type DinoAction = "IDLE" | "RUN" | "JUMP" | "VAULT" | "SLIDE" | "CLEAR";

function PixelDino({
  stride,
  ducking,
  jumping,
}: {
  stride: number;
  ducking: boolean;
  jumping: boolean;
}) {
  if (ducking) {
    // Low-profile parkour slide / duck sprite
    return (
      <svg width="28" height="16" viewBox="0 0 28 16" fill="none" aria-hidden="true">
        {/* Tail + back + head stretched forward */}
        <rect x="0" y="6" width="4" height="4" fill="#ff6b35" />
        <rect x="4" y="4" width="14" height="7" fill="#ff6b35" />
        <rect x="18" y="2" width="8" height="6" fill="#ff6b35" />
        <rect x="22" y="3" width="2" height="2" fill="#0a0a0f" />
        {/* Sliding legs */}
        <rect x="6" y="11" width="5" height="3" fill="#ff6b35" />
        <rect x="14" y="11" width="5" height="3" fill="#ff6b35" />
      </svg>
    );
  }

  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none" aria-hidden="true">
      {/* Head */}
      <rect x="10" y="0" width="10" height="7" fill="#ff6b35" />
      <rect x="16" y="2" width="2" height="2" fill="#0a0a0f" />
      <rect x="18" y="5" width="4" height="2" fill="#ff6b35" />
      {/* Torso & tail */}
      <rect x="6" y="7" width="10" height="9" fill="#ff6b35" />
      <rect x="2" y="9" width="4" height="5" fill="#ff6b35" />
      <rect x="0" y="7" width="2" height="4" fill="#ff6b35" />
      {/* Tiny arm */}
      <rect x="16" y="9" width="3" height="2" fill="#ff6b35" />
      {/* Legs */}
      {jumping ? (
        <>
          <rect x="7" y="16" width="3" height="5" fill="#ff6b35" />
          <rect x="12" y="15" width="3" height="5" fill="#ff6b35" />
        </>
      ) : stride === 0 ? (
        <>
          <rect x="7" y="16" width="3" height="8" fill="#ff6b35" />
          <rect x="12" y="16" width="3" height="4" fill="#ff6b35" />
        </>
      ) : (
        <>
          <rect x="7" y="16" width="3" height="4" fill="#ff6b35" />
          <rect x="12" y="16" width="3" height="8" fill="#ff6b35" />
        </>
      )}
    </svg>
  );
}

export function DinoRunner() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [manualJump, setManualJump] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setProgress(latest);
      setIsScrolling(true);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 160);
    });
    return () => {
      unsubscribe();
      if (timeout) clearTimeout(timeout);
    };
  }, [scrollYProgress]);

  function triggerManualJump() {
    if (manualJump) return;
    setManualJump(true);
    setTimeout(() => setManualJump(false), 380);
  }

  // Compute dino vertical offset & parkour state from scroll progress
  let jumpY = 0;
  let ducking = false;
  let action: DinoAction = isScrolling ? "RUN" : "IDLE";

  if (progress >= 0.99) {
    action = "CLEAR";
  } else {
    for (const obs of OBSTACLES) {
      const dist = progress - obs.pos;
      if (obs.kind === "rack" && Math.abs(dist) < 0.032) {
        const t = (dist + 0.032) / 0.064; // 0..1
        jumpY = -20 * 4 * t * (1 - t);
        action = "JUMP";
        break;
      }
      if (obs.kind === "platform" && Math.abs(dist) < 0.04) {
        const t = (dist + 0.04) / 0.08;
        // Vault up, run flat across platform, drop down
        if (t < 0.25) {
          jumpY = -14 * (t / 0.25);
        } else if (t <= 0.75) {
          jumpY = -14;
        } else {
          jumpY = -14 * ((1 - t) / 0.25);
        }
        action = "VAULT";
        break;
      }
      if (obs.kind === "drone" && Math.abs(dist) < 0.03) {
        ducking = true;
        action = "SLIDE";
        break;
      }
    }
  }

  if (manualJump && !ducking) {
    jumpY = Math.min(jumpY, -18);
    action = "JUMP";
  }

  const stride = Math.floor(progress * 260) % 2;
  const collectedOrbs = ORB_POSITIONS.filter((pos) => progress >= pos).length;
  const score = Math.round(progress * 1000) + collectedOrbs * 50;

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        suppressHydrationWarning
        aria-label="Show dino runner"
        className="fixed top-3 left-3 z-40 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-light)] text-[11px] text-[var(--accent)] tracking-wider hover:border-[var(--accent)] transition-colors cursor-pointer"
      >
        DINO // {String(score).padStart(4, "0")}
      </button>
    );
  }

  // Viewport window around current scroll progress (shows upcoming obstacles scrolling left)
  const dinoScreenX = 18; // % from left
  const worldScale = 240; // % width per 1.0 scroll progress

  return (
    <div className="fixed top-[3px] left-0 right-0 z-40 bg-[var(--bg)] border-b border-[var(--border)] select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-12 flex items-center gap-3">
        {/* Status & Score HUD */}
        <div className="flex items-center gap-2 shrink-0 text-[10px] sm:text-xs tracking-wider">
          <span className="px-2 py-0.5 rounded bg-[var(--accent-dim)] text-[var(--accent)] font-semibold min-w-[54px] text-center">
            {action}
          </span>
          <span className="hidden sm:inline text-[var(--muted)] tabular-nums">
            SCORE <strong className="text-[var(--fg)]">{String(score).padStart(4, "0")}</strong>
          </span>
          <span className="text-[var(--lime,#a8ff55)] tabular-nums">
            {collectedOrbs}/{ORB_POSITIONS.length}
          </span>
        </div>

        {/* Interactive Parkour Track */}
        <div
          role="button"
          tabIndex={0}
          onClick={triggerManualJump}
          onKeyDown={(e) => {
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              triggerManualJump();
            }
          }}
          aria-label="Scroll parkour runner track. Click or tap to jump."
          className="relative flex-1 h-10 overflow-hidden rounded-lg bg-[var(--bg-light)] border border-[var(--border)] cursor-pointer"
        >
          {/* Ground line */}
          <div className="absolute bottom-1.5 left-0 right-0 h-px bg-[var(--border)]" />

          {/* Scrolling ground ticks */}
          <div
            className="absolute bottom-0.5 left-0 right-0 h-1 opacity-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, var(--muted) 0px, var(--muted) 4px, transparent 4px, transparent 20px)",
              backgroundPositionX: `${-progress * 1800}px`,
            }}
          />

          {/* Collectible lime data orbs */}
          {ORB_POSITIONS.map((orbPos, idx) => {
            const leftPct = dinoScreenX + (orbPos - progress) * worldScale;
            if (leftPct < -5 || leftPct > 105) return null;
            const collected = progress >= orbPos;
            return (
              <div
                key={idx}
                className={`absolute bottom-5 w-2 h-2 rounded-full transition-opacity ${
                  collected ? "opacity-0" : "bg-[#a8ff55] opacity-90"
                }`}
                style={{ left: `${leftPct}%` }}
              />
            );
          })}

          {/* Obstacles: server racks, parkour platforms, overhead drones */}
          {OBSTACLES.map((obs, idx) => {
            const leftPct = dinoScreenX + (obs.pos - progress) * worldScale;
            if (leftPct < -12 || leftPct > 112) return null;

            if (obs.kind === "rack") {
              return (
                <div
                  key={idx}
                  className="absolute bottom-1.5 flex flex-col items-center"
                  style={{ left: `${leftPct}%`, transform: "translateX(-50%)" }}
                >
                  <div className="w-3.5 h-4 border border-[var(--accent)] bg-[var(--accent-dim)] rounded-t-sm flex flex-col justify-evenly items-center px-0.5">
                    <span className="w-2 h-[1px] bg-[var(--accent)]" />
                    <span className="w-2 h-[1px] bg-[var(--accent)]" />
                  </div>
                </div>
              );
            }

            if (obs.kind === "platform") {
              return (
                <div
                  key={idx}
                  className="absolute bottom-5 h-1.5 w-10 sm:w-12 rounded-sm bg-[#a8ff55] opacity-80"
                  style={{ left: `${leftPct}%`, transform: "translateX(-50%)" }}
                />
              );
            }

            // Overhead drone
            return (
              <div
                key={idx}
                className="absolute top-1.5 flex items-center gap-0.5"
                style={{ left: `${leftPct}%`, transform: "translateX(-50%)" }}
              >
                <div className="w-5 h-2 rounded-sm border border-[#a8ff55] bg-[var(--bg)]" />
              </div>
            );
          })}

          {/* The Pixel Dinosaur */}
          <motion.div
            className="absolute bottom-1.5 will-change-transform"
            style={{ left: `${dinoScreenX}%` }}
            animate={{ y: jumpY }}
            transition={{ type: "spring", stiffness: 520, damping: 28 }}
          >
            <PixelDino
              stride={isScrolling ? stride : 0}
              ducking={ducking}
              jumping={jumpY < -2}
            />
          </motion.div>
        </div>

        {/* Hide button */}
        <button
          type="button"
          onClick={() => setMinimized(true)}
          suppressHydrationWarning
          aria-label="Minimize dino runner"
          className="shrink-0 text-[10px] text-[var(--muted)] hover:text-[var(--fg)] px-2 py-1 rounded border border-[var(--border)] cursor-pointer"
        >
          HIDE
        </button>
      </div>
    </div>
  );
}

