type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

/** Lead capturado pelo formulário. No-op se o Pixel não estiver carregado. */
export function trackLead(): void {
  getFbq()?.('track', 'Lead');
}

/** Clique no WhatsApp. No-op se o Pixel não estiver carregado. */
export function trackContact(): void {
  getFbq()?.('track', 'Contact');
}
