import { useEffect, useState } from "react";

import { currentLeadContext, DEFAULT_SOURCE, pageCode, type LeadContext } from "@/lib/lead-source";

/**
 * Page, source and ref for hidden form fields. Starts at the server default
 * (source "D") and switches to the real source after hydration.
 */
export function useLeadContext(pathname: string): LeadContext {
  const page = pageCode(pathname);
  const initial: LeadContext = {
    page,
    source: DEFAULT_SOURCE,
    ref: `${page}-${DEFAULT_SOURCE}`,
  };
  const [ctx, setCtx] = useState(initial);
  useEffect(() => {
    setCtx(currentLeadContext());
  }, [pathname, setCtx]);
  return ctx;
}
