import sharp from "sharp";
import { readdir, mkdir, rm } from "node:fs/promises";

const sequences = [
  { src: "raw-frames", name: "hero", maxFrames: 144 },
  { src: "raw-frames-about", name: "about", maxFrames: 144 },
];

const variants = [
  // Desktop: Pristine 1080p landscape (1920x1080) at high quality
  {
    suffix: "",
    resizeOptions: { width: 1920, height: 1080, fit: "inside" },
    quality: 75,
  },
  // Mobile: Portrait-optimized (1080x1080 centered crop) preserving full 1080p vertical resolution
  {
    suffix: "-sm",
    resizeOptions: { width: 1080, height: 1080, fit: "cover", position: "center" },
    quality: 74,
  },
];

for (const { src, name, maxFrames } of sequences) {
  const allFiles = (await readdir(src)).filter((f) => f.endsWith(".png")).sort();
  const files = allFiles.slice(0, maxFrames);

  for (const { suffix, resizeOptions, quality } of variants) {
    const out = `public/frames/${name}${suffix}`;
    await rm(out, { recursive: true, force: true });
    await mkdir(out, { recursive: true });

    // Process in batches of 16 to keep memory efficient
    const batchSize = 16;
    for (let b = 0; b < files.length; b += batchSize) {
      const batch = files.slice(b, b + batchSize);
      await Promise.all(
        batch.map((file, idx) => {
          const i = b + idx;
          return sharp(`${src}/${file}`)
            .resize(resizeOptions)
            .webp({ quality, effort: 4 })
            .toFile(`${out}/frame_${String(i + 1).padStart(4, "0")}.webp`);
        })
      );
    }
    console.log(`${out}: ${files.length} frames generated (quality: ${quality})`);
  }
}