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
  const [folder, setFolder] = useState(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const loaded = loadedCount === frameCount;

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

  const draw = (index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img?.complete) return;
    const ctx = canvas.getContext("2d");
    const cr = canvas.width / canvas.height;
    const ir = img.width / img.height;
    let w, h, x, y;
    if (ir > cr) {
      h = canvas.height; w = h * ir; x = (canvas.width - w) / 2; y = 0;
    } else {
      w = canvas.width; h = w / ir; x = 0; y = (canvas.height - h) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

  useEffect(() => {
    setFolder(window.innerWidth < 768 ? `${name}-sm` : name);
  }, [name]);

  useEffect(() => {
    if (!folder) return;
    let cancelled = false;
    setLoadedCount(0);
    imagesRef.current = Array.from({ length: frameCount }, (_, i) => {
      const img = new Image();
      img.src = `/frames/${folder}/frame_${String(i + 1).padStart(4, "0")}.webp`;
      img.onload = () => {
        if (cancelled) return;
        setLoadedCount((c) => c + 1);
        if (i === 0) {
          draw(0);
        }
      };
      return img;
    });
    return () => {
      cancelled = true;
    };
  }, [folder, frameCount]);

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
    if (loaded) {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
      draw(0);
    }
  }, [loaded]);

  return (
    <section
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Dedicated scroll-based dark overlay reveal layer */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {!loaded && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-black text-white">
          <p className="text-lg tabular-nums">
            Loading {Math.round((loadedCount / frameCount) * 100)}%
          </p>
        </div>
      )}

      {children?.(progress)}
    </section>
  );
}