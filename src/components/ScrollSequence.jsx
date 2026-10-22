import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollSequence({
  name,
  frameCount,
  scrollLength = 4000,
  initialOverlayOpacity = 0.7,
  fadeEndProgress = 0.45,
  mobileFocalX,
  children, // (progress) => JSX
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const lastDrawnFrameRef = useRef(-1);

  // Determine initial folder based on viewport width to avoid cascading re-renders
  const [folder, setFolder] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768 ? `${name}-sm` : name;
    }
    return name;
  });

  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "fallback"
  const [loadedCount, setLoadedCount] = useState(0);

  const progress = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-based dark overlay reveal: starts dark for readability, fades to transparent
  const dynamicOverlayOpacity = useTransform(
    progress,
    [0, fadeEndProgress],
    [initialOverlayOpacity, 0]
  );
  const overlayOpacity = shouldReduceMotion
    ? initialOverlayOpacity * 0.75
    : dynamicOverlayOpacity;

  // Listen for window resize to adapt asset resolution (mobile vs desktop)
  useEffect(() => {
    const handleResize = () => {
      const targetFolder = window.innerWidth < 768 ? `${name}-sm` : name;
      setFolder((prev) => (prev !== targetFolder ? targetFolder : prev));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [name]);

  const draw = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const clampedIndex = Math.min(frameCount - 1, Math.max(0, Math.round(index)));
      targetFrameRef.current = clampedIndex;

      const img = imagesRef.current[clampedIndex];
      let imgToDraw = img && img.complete && img.naturalWidth && img.naturalHeight ? img : null;

      // If target frame isn't loaded yet and nothing has been drawn yet, search for closest loaded frame
      if (!imgToDraw && lastDrawnFrameRef.current === -1) {
        for (let offset = 1; offset < frameCount; offset++) {
          const prev = imagesRef.current[clampedIndex - offset];
          if (prev && prev.complete && prev.naturalWidth) {
            imgToDraw = prev;
            break;
          }
          const next = imagesRef.current[clampedIndex + offset];
          if (next && next.complete && next.naturalWidth) {
            imgToDraw = next;
            break;
          }
        }
      }

      // If current target image isn't loaded and we already have a drawn frame on canvas,
      // retain the current canvas frame without jumping or blanking out.
      if (!imgToDraw) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Enable high-quality bicubic interpolation for crisp rendering on retina displays
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const cr = canvas.width / canvas.height;
      const ir = imgToDraw.naturalWidth / imgToDraw.naturalHeight;
      let w, h, x, y;
      if (ir > cr) {
        h = canvas.height;
        w = h * ir;
        // On mobile viewports (< 768px), align the visual subject centered on canvas:
        // - Hero: 0.435 (keeps head within ±4% of screen center across all frames).
        // - About: starts at 0.68 (frames the developer's head, face, and upper body naturally on the right,
        //   giving comfortable room for the text on the left), then smoothly transitions to 0.50
        //   between frames 30 and 85 as the camera zooms into the centered laptop code screen.
        const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
        let focalX = 0.5;
        if (isMobile) {
          if (typeof mobileFocalX === "function") {
            const progressRatio = frameCount > 1 ? clampedIndex / (frameCount - 1) : 0;
            focalX = mobileFocalX(progressRatio, clampedIndex);
          } else if (typeof mobileFocalX === "number") {
            focalX = mobileFocalX;
          } else if (name === "hero") {
            focalX = 0.435;
          } else if (name === "about") {
            if (clampedIndex <= 30) {
              focalX = 0.68;
            } else if (clampedIndex >= 85) {
              focalX = 0.50;
            } else {
              const t = (clampedIndex - 30) / (85 - 30);
              const ease = t * t * (3 - 2 * t);
              focalX = 0.68 + (0.50 - 0.68) * ease;
            }
          }
        }
        const targetX = canvas.width * 0.5 - w * focalX;
        const minX = canvas.width - w;
        const maxX = 0;
        x = Math.min(maxX, Math.max(minX, targetX));
        y = 0;
      } else {
        w = canvas.width;
        h = w / ir;
        x = 0;
        y = (canvas.height - h) / 2;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(imgToDraw, x, y, w, h);
      lastDrawnFrameRef.current = clampedIndex;
    },
    [frameCount, mobileFocalX, name]
  );

  const rawBase = import.meta.env.BASE_URL || "/";
  const baseUrl = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

  // Preload frame sequence with explicit error handling and timeout protection
  useEffect(() => {
    if (!folder) return;
    let cancelled = false;
    let localLoaded = 0;
    let localErrors = 0;

    const checkCompletion = () => {
      if (cancelled) return;
      const totalProcessed = localLoaded + localErrors;
      if (totalProcessed >= frameCount) {
        if (localLoaded > 0) {
          setStatus("ready");
        } else {
          // If all frames failed (e.g. 404 on deployment), switch to fallback immediately
          console.warn(`[ScrollSequence] All frames failed to load for "${name}". Using fallback.`);
          setStatus("fallback");
        }
      }
    };

    // Safety timeout: never leave the visitor stuck for more than 6 seconds
    const timeoutId = setTimeout(() => {
      if (cancelled) return;
      if (localLoaded > 0) {
        setStatus("ready");
      } else {
        console.warn(`[ScrollSequence] Loading timed out for "${name}". Using fallback.`);
        setStatus("fallback");
      }
    }, 6000);

    imagesRef.current = Array.from({ length: frameCount }, (_, i) => {
      const img = new Image();
      img.src = `${baseUrl}frames/${folder}/frame_${String(i + 1).padStart(4, "0")}.webp`;

      img.onload = () => {
        if (cancelled) return;
        localLoaded += 1;
        setLoadedCount(localLoaded);
        // Do not allow asynchronously loaded frames to overwrite the active frame
        // with an incorrect one. Only draw if this loaded image matches the target frame,
        // or if no frame has ever been rendered to the canvas yet.
        if (targetFrameRef.current === i || lastDrawnFrameRef.current === -1) {
          draw(targetFrameRef.current);
          setStatus((prev) => (prev === "loading" ? "ready" : prev));
          if (name === "hero" && typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("portfolio:hero-ready"));
          }
        }
        checkCompletion();
      };

      img.onerror = () => {
        if (cancelled) return;
        localErrors += 1;
        checkCompletion();
      };

      return img;
    });

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [folder, frameCount, baseUrl, name, draw]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const state = { frame: targetFrameRef.current || 0 };

      // Prevent GSAP ScrollTrigger from jumping when mobile address bar shows/hides
      ScrollTrigger.config({ ignoreMobileResize: true });

      let lastWidth = window.innerWidth;
      let lastHeight = window.innerHeight;

      const resize = (force = false) => {
        if (!canvas) return;
        const curW = window.innerWidth;
        const curH = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        // On mobile devices, vertical scrolling triggers window.resize when the browser's
        // URL/navigation bar collapses or expands (only height changes by ~50-100px).
        // Avoid re-allocating canvas backing store dimensions during scroll-induced address bar changes
        // because resizing backing-store clears the canvas and alters the aspect ratio,
        // causing abrupt jumps in subject scale and position.
        const widthChanged = Math.abs(curW - lastWidth) > 2;
        const heightChangedDramatically = Math.abs(curH - lastHeight) > 200;

        if (force || widthChanged || heightChangedDramatically) {
          lastWidth = curW;
          lastHeight = curH;

          const targetW = Math.round(curW * dpr);
          const targetH = Math.round(curH * dpr);
          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
          }
        }
        draw(targetFrameRef.current);
      };

      resize(true);
      const onResize = () => resize(false);
      const onOrientationChange = () => {
        setTimeout(() => resize(true), 100);
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("orientationchange", onOrientationChange);

      gsap.to(state, {
        frame: frameCount - 1,
        ease: "none",
        snap: "frame",
        onUpdate: () => {
          const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.round(state.frame)));
          draw(frameIndex);
        },
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: 0.5,
          pin: true,
          onUpdate: (self) => progress.set(self.progress),
        },
      });

      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("orientationchange", onOrientationChange);
      };
    },
    { dependencies: [frameCount, scrollLength], scope: wrapRef }
  );

  useEffect(() => {
    if (status === "ready") {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      draw(targetFrameRef.current);
    }
  }, [status, draw]);

  const isFallback = status === "fallback";

  return (
    <section
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Primary Canvas for Frame-by-Frame Scroll Scrub */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${isFallback ? "hidden" : "block"}`}
      />

      {/* Fallback Display: Background Video or Gradient Backdrop if Animation Assets Fail */}
      {isFallback && (
        <div className="absolute inset-0 overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 h-full w-full object-cover opacity-60 ${
              name === "hero"
                ? "object-[43.5%_center] md:object-center"
                : name === "about"
                ? "object-[68%_center] md:object-center"
                : "object-center"
            }`}
            src={`${baseUrl}${name}.mp4`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>
      )}

      {/* Ambient Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

      {/* Dedicated scroll-based dark overlay reveal layer */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Loading Screen: Only displayed while genuinely loading, never trapped indefinitely */}
      {status === "loading" && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-black text-white">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <p className="text-lg tabular-nums font-mono text-zinc-300">
              Loading {Math.min(100, Math.round((loadedCount / frameCount) * 100))}%
            </p>
          </div>
        </div>
      )}

      {children?.(progress)}
    </section>
  );
}