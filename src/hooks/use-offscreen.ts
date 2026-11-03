import { useEffect, useState } from "react";

/**
 * True while an element is scrolled out of view, so a looping animation (the
 * promo ticker, the search box's typing line and caret) can rest instead of
 * running where nobody can see it. Pass the returned callback as the
 * element's `ref`. It starts false, so the server render and the first paint
 * show the element as it should look when on screen.
 */
export function useOffscreen<T extends Element>(): [(node: T | null) => void, boolean] {
  const [node, setNode] = useState<T | null>(null);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) setOffscreen(!entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return [setNode, offscreen];
}
