import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackLead, trackContact } from './tracking';

describe('tracking', () => {
  beforeEach(() => {
    // @ts-expect-error limpando o mock global entre testes
    globalThis.window = {};
  });

  it('trackLead não quebra quando fbq não existe', () => {
    expect(() => trackLead()).not.toThrow();
  });

  it('trackLead chama fbq("track","Lead") quando fbq existe', () => {
    const fbq = vi.fn();
    // @ts-expect-error mock
    globalThis.window.fbq = fbq;
    trackLead();
    expect(fbq).toHaveBeenCalledWith('track', 'Lead');
  });

  it('trackContact chama fbq("track","Contact") quando fbq existe', () => {
    const fbq = vi.fn();
    // @ts-expect-error mock
    globalThis.window.fbq = fbq;
    trackContact();
    expect(fbq).toHaveBeenCalledWith('track', 'Contact');
  });
});
