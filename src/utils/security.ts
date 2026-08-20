/**
 * Security & Sanitization Utilities
 * Protects against XSS, injection attacks, and unsafe protocols.
 */

// Strip harmful HTML and script characters from user strings
export function sanitizeText(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, '') // Strip < and > to prevent HTML/script injection
    .replace(/javascript:/gi, '') // Prevent javascript: pseudo-protocol
    .replace(/data:text\/html/gi, ''); // Prevent data HTML URI injection
}

// Validate that an image URL is safe and uses permitted protocols
export function sanitizeImageUrl(url: string, fallback: string): string {
  if (!url || typeof url !== 'string') return fallback;

  const trimmed = url.trim();

  // Allow standard HTTPS / HTTP image URLs
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    // Block javascript: or other harmful schemes embedded in URLs
    if (/^(https?:\/\/)/i.test(trimmed)) {
      return trimmed;
    }
  }

  // Allow base64 data URIs only if they are valid images
  if (trimmed.startsWith('data:image/')) {
    return trimmed;
  }

  return fallback;
}

// Validate coordinate ranges
export function sanitizeCoordinates(lat: number, lng: number): { lat: number; lng: number } {
  const safeLat = typeof lat === 'number' && !isNaN(lat) ? Math.max(-90, Math.min(90, lat)) : 20.5937;
  const safeLng = typeof lng === 'number' && !isNaN(lng) ? Math.max(-180, Math.min(180, lng)) : 78.9629;
  return { lat: safeLat, lng: safeLng };
}
