/**
 * Single source of truth for the business WhatsApp contact.
 *
 * The number was previously repeated in the two home routes and inlined
 * again in the journal helper. Everything now builds links from here.
 */
export const WHATSAPP_NUMBER = "919825208413";

/** Builds a wa.me link with a prefilled message. */
export function whatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
