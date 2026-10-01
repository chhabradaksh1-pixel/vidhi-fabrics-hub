import { useEffect, useRef } from "react";

/**
 * A muted, looping background video that downloads nothing until it is near
 * the viewport.
 *
 * The homepage loom clip is ~6 MB and sits well below the fold. As a plain
 * `autoPlay` video every first visit paid for it up front, and `preload`
 * alone cannot stop that: browsers ignore `preload="none"` on an autoplaying
 * element. So the element is not `autoPlay`; it ships with `preload="none"`
 * and a still poster frame, and starts playing only once it scrolls within
 * reach. It pauses again when it leaves the viewport.
 *
 * Without IntersectionObserver it simply plays, as it did before.
 */
export function LazyLoopVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const play = () => {
      video.play().catch(() => {
        // Autoplay can still be refused (data saver, low-power mode). The
        // poster stays up, which is the right fallback for a decorative clip.
      });
    };
    if (typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) play();
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
