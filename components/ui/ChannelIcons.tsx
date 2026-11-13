import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/**
 * Channel icons.
 * We purposely keep them monochrome (currentColor) so they pick up our
 * brand-* palette. The accent dot lets each channel still feel distinct.
 */

export function WebsiteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.76-1.653-2.057-.173-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.67-.51a11.98 11.98 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88V14.9H7.9V12h2.53V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.57V12h2.78l-.44 2.9h-2.34v6.98A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M21.54 4.33 2.9 11.5c-1.27.51-1.26 1.22-.23 1.53l4.78 1.49 1.85 5.66c.21.58.11.82.72.82.47 0 .68-.21.94-.47l2.27-2.21 4.72 3.49c.87.48 1.5.23 1.72-.81l3.11-14.66c.32-1.28-.48-1.85-1.34-1.51m-3.12 3.4-8.75 7.87-.34 3.65L8.3 13.9l10.12-6.17Z" />
    </svg>
  );
}

export function GoogleCalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <path d="M9.5 13.5c.4-.6 1-.9 1.7-.9.9 0 1.6.6 1.6 1.4 0 .6-.4 1.1-1 1.3.7.1 1.2.6 1.2 1.4 0 1-.8 1.6-1.9 1.6-.8 0-1.5-.3-1.9-.9" fill="none" />
    </svg>
  );
}

/** Google Drive's triangle as an outline (three folded panels). */
export function GoogleDriveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden {...props}>
      <path d="M8.6 3.5h6.8l6.6 11.3-3.4 5.7H5.4L2 14.8z" />
      <path d="M8.6 3.5 15.4 15H22M15.4 3.5 8.6 15 5.4 20.5M2 14.8h13.4" />
    </svg>
  );
}

/** Google Drive's full-colour mark. */
export function GoogleDriveColorIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 87.3 78" aria-hidden {...props}>
      <path fill="#0066DA" d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" />
      <path fill="#00AC47" d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" />
      <path fill="#EA4335" d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" />
      <path fill="#00832D" d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" />
      <path fill="#2684FC" d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" />
      <path fill="#FFBA00" d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" />
    </svg>
  );
}

export function ShopifyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M7.5 8V6.75a4.5 4.5 0 0 1 9 0V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.7 8h14.6l1.25 12.9a.6.6 0 0 1-.6.66H4.05a.6.6 0 0 1-.6-.66L4.7 8Z"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      <path
        d="M15.45 11.1c-.65-.36-1.43-.55-2.3-.55-1.84 0-3.06.96-3.06 2.38 0 1.17.82 1.78 2.3 2.48.92.43 1.27.7 1.27 1.16 0 .52-.46.83-1.23.83-.8 0-1.72-.27-2.52-.73l-.45 1.82c.78.44 1.87.71 2.99.71 2.02 0 3.3-.98 3.3-2.52 0-1.12-.63-1.83-2.14-2.55-.99-.48-1.42-.76-1.42-1.22 0-.42.4-.7 1.05-.7.69 0 1.36.17 1.94.49l.27-1.6Z"
        fill="white"
      />
    </svg>
  );
}

export function MessengerIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87a.8.8 0 0 1 .53-.04c.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2Zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75a.6.6 0 0 0 .72 0l3.16-2.4c.42-.32.97.18.69.63Z" />
    </svg>
  );
}

export function ViberIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
      <path d="M11.5 2.5c4.8 0 8.5 1.4 9 6.2.3 2.6.2 4.6-.4 6.6-1 3.3-4.3 4.2-7.6 4.2l-3 2.5v-2.8C5.6 18.4 3.5 16.5 3 13.2c-.3-2-.3-3.6 0-5.4.7-4.1 3.9-5.3 8.5-5.3Z" />
      <path d="M9 7.5c.5-.3 1-.2 1.2.3l.6 1.3c.2.4 0 .8-.3 1.1l-.3.3c.4 1 1.2 1.9 2.3 2.4l.3-.3c.3-.3.8-.4 1.1-.2l1.3.7c.4.2.6.8.3 1.2-.5.8-1.3 1.1-2.2.8-2.2-.8-3.9-2.5-4.7-4.7-.3-.9 0-1.6.4-1.9Z" fill="currentColor" stroke="none" />
      <path d="M12.5 6.2a4 4 0 0 1 3.6 3.6M12.5 4.4a5.8 5.8 0 0 1 5.4 5.4" />
    </svg>
  );
}

export function DiscordIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .079.009c.12.1.246.198.373.292a.077.077 0 0 1-.007.128 12.3 12.3 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.029ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.332-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.175 1.095 2.156 2.42 0 1.332-.946 2.418-2.156 2.418Z" />
    </svg>
  );
}

/** Slack's mark keeps its four brand colours unless `mono` (then currentColor). */
export function SlackIcon({ mono, ...props }: IconProps & { mono?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill={mono ? "currentColor" : "#E01E5A"} d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52ZM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313Z" />
      <path fill={mono ? "currentColor" : "#36C5F0"} d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834ZM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312Z" />
      <path fill={mono ? "currentColor" : "#2EB67D"} d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834ZM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312Z" />
      <path fill={mono ? "currentColor" : "#ECB22E"} d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52ZM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313Z" />
    </svg>
  );
}

export const CHANNEL_ICON_MAP = {
  web: WebsiteIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  telegram: TelegramIcon,
  gcal: GoogleCalendarIcon,
  shopify: ShopifyIcon,
} as const;

export type ChannelId = keyof typeof CHANNEL_ICON_MAP;
