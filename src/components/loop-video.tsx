import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * A short muted clip that loops and never shows the browser's play button.
 *
 * React does not write the `muted` attribute into server-rendered HTML, so a
 * phone saw an unmuted `autoplay` video, refused to play it and drew its own
 * play button over it. Here the element is muted in code before `play()`. If
 * the browser still refuses (iOS Low Power Mode, data saver), the clip is
 * removed and the still underneath it stays, so no control ever appears. The
 * clip is decorative: hidden from assistive tech and out of the tab order.
 * It plays only near the viewport and pauses once scrolled away (as
 * LazyLoopVideo does), so a phone is not decoding a clip nobody can see.
 */
export function LoopVideo({
  src,
  className = "",
  style,
}: {
  src: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    const play = () => video.play()?.catch(() => setRefused(true));
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
  }, [src]);

  if (refused) return null;
  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      className={`vf-loop-video ${className}`}
      style={style}
    />
  );
}
