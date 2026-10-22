import { useRef, useEffect, useState } from "react";
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
  children, // (progress) => JSX
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);

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

  const draw = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || !img.naturalWidth || !img.naturalHeight) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cr = canvas.width / canvas.height;
    const ir = img.naturalWidth / img.naturalHeight;
    let w, h, x, y;
    if (ir > cr) {
      h = canvas.height;
      w = h * ir;
      x = (canvas.width - w) / 2;
      y = 0;
    } else {
      w = canvas.width;
      h = w / ir;
      x = 0;
      y = (canvas.height - h) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

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
        if (i === 0) {
          draw(0);
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
  }, [folder, frameCount, baseUrl, name]);

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      const state = { frame: 0 };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        if (canvas) {
          canvas.width = window.innerWidth * dpr;
          canvas.height = window.innerHeight * dpr;
        }
        draw(Math.round(state.frame));
      };
      resize();
      window.addEventListener("resize", resize);

      gsap.to(state, {
        frame: frameCount - 1,
        ease: "none",
        snap: "frame",
        onUpdate: () => draw(state.frame),
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

      return () => window.removeEventListener("resize", resize);
    },
    { dependencies: [frameCount, scrollLength], scope: wrapRef }
  );

  useEffect(() => {
    if (status === "ready") {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      draw(0);
    }
  }, [status]);

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
            className="absolute inset-0 h-full w-full object-cover opacity-60"
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