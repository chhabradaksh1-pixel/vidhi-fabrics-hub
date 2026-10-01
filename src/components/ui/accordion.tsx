import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

/*
 * An answer panel whose text is always in the server-rendered HTML.
 *
 * Radix's `AccordionContent` renders its children only while the item is
 * open — even with `forceMount`, closed items ship as an empty `<div hidden>`.
 * That left every homepage FAQ answer out of the HTML a crawler receives:
 * they existed only in the FAQPage JSON-LD, which is a structured-data /
 * visible-content mismatch and gives answer engines nothing to quote.
 *
 * This panel is a plain element driven entirely by the item's `data-state`,
 * so it needs no React state and renders identically on server and client.
 * Closed: zero-height grid row plus `visibility: hidden`, which keeps the text
 * in the markup but out of view, the tab order and the accessibility tree.
 * Open: the row expands to its content height, with the same short ease the
 * Radix animation used. The parent `AccordionItem` must carry `group/faq`.
 */
const AccordionPanel = ({
  id,
  className,
  children,
}: {
  /** Pass the same id as the trigger's `aria-controls`. */
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    role="region"
    className="invisible grid grid-rows-[0fr] text-sm transition-[grid-template-rows,visibility] duration-200 ease-out group-data-[state=open]/faq:visible group-data-[state=open]/faq:grid-rows-[1fr] motion-reduce:transition-none"
  >
    <div className="min-h-0 overflow-hidden">
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </div>
  </div>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionPanel };
