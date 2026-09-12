const WHATSAPP_NUMBER = "919825208413";

/** Builds a wa.me link with a prefilled message. */
export function whatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
