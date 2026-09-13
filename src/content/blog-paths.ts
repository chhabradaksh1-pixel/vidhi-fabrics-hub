/**
 * English and Hindi each have their own crawlable URL (/blog and /hi/blog).
 * Hinglish stays a client-side reading preference, as it does on the home
 * routes, so it does not create a third set of URLs for the same content.
 */
export function blogPaths(slug?: string) {
  const tail = slug ? `/${slug}` : "";
  return { en: `/blog${tail}`, hi: `/hi/blog${tail}` };
}
