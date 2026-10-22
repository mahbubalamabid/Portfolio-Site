import { useState, useEffect } from "react";
import LatticeLoader from "./LatticeLoader";

export default function InitialLoadingScreen() {
  const [isFading, setIsFading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock body scrolling during initial loading to prevent jumpy layout or scroll shifts
    const originalOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let isCancelled = false;
    let fadeTimerId = null;

    const completeLoading = () => {
      if (isCancelled) return;
      isCancelled = true;

      // Start smooth fade-out
      setIsFading(true);

      const fadeDuration = prefersReducedMotion ? 50 : 450;
      fadeTimerId = setTimeout(() => {
        setIsFinished(true);
        // Restore scrolling once completely hidden
        document.body.style.overflow = originalOverflow || "";
        document.documentElement.style.overflow = originalDocOverflow || "";
      }, fadeDuration);
    };

    // Safety timeout: Ensure the loading screen never remains visible indefinitely
    // even on slow connections or failed asset downloads
    const safetyTimeoutId = setTimeout(() => {
      completeLoading();
    }, 3500);

    // Critical initialization tasks:
    // 1. Wait for document fonts to avoid FOIT / layout shifts
    const fontsPromise =
      typeof document !== "undefined" && document.fonts?.ready
        ? document.fonts.ready
        : Promise.resolve();

    // 2. Wait for window load event if document is still loading
    const windowLoadPromise = new Promise((resolve) => {
      if (typeof document !== "undefined" && document.readyState === "complete") {
        resolve();
      } else {
        const onWindowLoad = () => {
          window.removeEventListener("load", onWindowLoad);
          resolve();
        };
        window.addEventListener("load", onWindowLoad);
      }
    });

    // 3. Preload the Hero sequence's first frame so the canvas renders immediately without blank flash
    const heroFirstFramePromise = new Promise((resolve) => {
      if (typeof window === "undefined") {
        resolve();
        return;
      }
      const rawBase = import.meta.env.BASE_URL || "/";
      const baseUrl = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
      const folder = window.innerWidth < 768 ? "hero-sm" : "hero";
      const firstFrameSrc = `${baseUrl}frames/${folder}/frame_0001.webp`;

      const img = new Image();
      img.src = firstFrameSrc;
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Gracefully proceed even on frame error
      }
    });

    // 4. Also listen for the custom portfolio:hero-ready event
    const onHeroReady = () => {
      completeLoading();
    };
    window.addEventListener("portfolio:hero-ready", onHeroReady, { once: true });

    // Await all critical initialization promises concurrently
    Promise.allSettled([fontsPromise, windowLoadPromise, heroFirstFramePromise]).then(() => {
      completeLoading();
    });

    return () => {
      isCancelled = true;
      clearTimeout(safetyTimeoutId);
      if (fadeTimerId) clearTimeout(fadeTimerId);
      window.removeEventListener("portfolio:hero-ready", onHeroReady);
      document.body.style.overflow = originalOverflow || "";
      document.documentElement.style.overflow = originalDocOverflow || "";
    };
  }, []);

  if (isFinished) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Initial Loading Screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black select-none pointer-events-auto transition-opacity duration-450 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        width: "100vw",
        height: "100dvh",
        backgroundColor: "#000000",
      }}
    >
      <div className="flex items-center justify-center px-4 max-w-full text-white">
        <LatticeLoader
          status="working"
          label="Loading portfolio..."
          pattern="sweep"
          grid={4}
          shape="round"
          color="#52e8fb"
          doneColor="#22c55e"
          errorColor="#ef4444"
          cellSize={6}
          gap={3}
          fontSize={15}
          step={100}
          idleOpacity={0.19}
          glow={false}
          showTimer
        />
      </div>
    </div>
  );
}
