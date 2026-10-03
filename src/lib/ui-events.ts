/**
 * Window event fired when the homepage enquiry pop-up opens or closes, so the
 * floating Talk-to-us button can step aside instead of sitting on top of the
 * pop-up's submit button (which it did on mobile). Detail: `{ open: boolean }`.
 */
export const LEAD_POPUP_EVENT = "vf:lead-popup";

export type LeadPopupEventDetail = { open: boolean };
