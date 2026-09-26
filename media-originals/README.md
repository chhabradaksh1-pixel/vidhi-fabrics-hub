# Video originals

The camera originals behind `public/weaving-loom.mp4`. They live here rather
than in `public/` because everything in `public/` is deployed: Vercel does not
resolve Git LFS, so each of these was being served at the site root as ~134
bytes of LFS pointer text under a `video/quicktime` content type.

They are kept because they are the source for any future re-encode of the loom
video, which at 6,059,529 bytes is 69% of the homepage's first-visit payload
and the single largest thing wrong with that page's performance. Re-encoding
needs ffmpeg, which is not available in the agent environment.

Nothing in `src/` imports these, so they add no page weight.
