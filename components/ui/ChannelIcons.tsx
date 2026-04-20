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

export function ShopifyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M15.04 4.48c-.02-.14-.14-.22-.25-.23-.11-.01-2.07.04-2.07.04s-1.23-1.2-1.43-1.4c-.2-.2-.6-.14-.75-.1-.02.01-.4.12-1.02.32-.62-1.79-1.71-2.5-2.72-2.5-.13 0-.26.01-.39.03-.04-.05-.08-.1-.13-.15C5.77.04 5.27-.02 4.67.08 3.5.36 2.35 1.22 1.42 2.6.76 3.59.26 4.82 0 6.06.02 6.06 1.85 6.63 4.5 7.46c.12-.76.44-2.83 1.35-3.95.33-.4.72-.74 1.2-.92.03.35 0 .77-.07 1.27-.8.2-1.4.72-1.68 1.37-.31.72-.15 1.47.45 1.95.58.46 1.5.57 2.28.21.81-.37 1.5-1.17 1.86-2.02.31.02.59.08.85.16-.28 1.32-.71 2.8-1.1 4.15-.5 1.74-.95 3.3-.95 3.3s5.89 1.83 6.12 1.9c.28.09.26-.01.36-.33.08-.27 2.74-10.42 2.74-10.42l-.87-.64ZM7.34 3.58c-.29.09-.62.2-.96.3.1-.78.38-1.48.75-1.86.14-.14.33-.3.57-.39-.22.45-.33 1.06-.36 1.95Zm1.42-.43c.04-.5.02-1.19-.15-1.74.65.12 1.14.79 1.42 1.58-.43.14-.86.26-1.27.16ZM10.67 2c-.02 0-.04.01-.06.01-.19-.53-.45-1.03-.8-1.42.79.15 1.56.71 1.98 1.42-.39-.02-.78.01-1.12.01v-.02Z" />
      <path d="M14.79 4.25c-.11-.01-2.07.04-2.07.04s-1.23-1.2-1.43-1.4c-.07-.07-.17-.11-.27-.13v19.49l6.12-1.52s-2.66-10.15-2.74-10.42c-.1-.32-.08-.22-.36-.33-.1-.03-1.25-1.73-1.25-1.73Z" opacity="0.6" />
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
