/**
 * The tick that draws itself into the enquiry button once the form is sent
 * (styles in showroom.css, `.vf-tick`). Decorative: the sent message below
 * the button is what announces success.
 */
export function SendTick({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={`vf-tick${on ? " is-on" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}
