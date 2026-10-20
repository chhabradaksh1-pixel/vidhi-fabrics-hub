import { useEffect, useRef } from "react";

/**
 * A muted, looping background video that waits until it is near the viewport
 * before the browser selects and downloads one of its source formats.
 *
 * Keep this decorative About page clip off the initial request list: it has no
 * autoplay attribute, starts only when it scrolls within 200px, and pauses
 * when it leaves the viewport. The poster remains visible while it is idle.
 *
 * Without IntersectionObserver it simply plays, as it did before.
 */
export function LazyLoopVideo({
  mp4Src,
  webmSrc,
  poster,
  className,
}: {
  mp4Src: string;
  webmSrc: string;
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
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    >
      <source src={mp4Src} type="video/mp4" />
      <source src={webmSrc} type="video/webm" />
    </video>
  );
}
