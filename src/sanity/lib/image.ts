import { dataset, projectId } from '../env';

/**
 * Normalizes an image source path or URL.
 * Preserves external URLs and existing root-relative paths,
 * only prepending a leading slash if needed.
 */
export const normalizeSrc = (src?: string | null): string => {
  if (!src) return '';
  return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')
    ? src
    : `/${src}`;
};

/**
 * Builds direct CDN URL for Sanity image asset references
 */
export function urlForImage(source: any): string {
  if (!source) return '';
  if (typeof source === 'string') {
    return normalizeSrc(source);
  }
  if (source.asset?.url) {
    return source.asset.url;
  }
  if (source.asset?._ref || source._ref) {
    const ref = source.asset?._ref || source._ref;
    // Sanity asset ID format: image-{id}-{dimensions}-{format}
    const parts = ref.split('-');
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const format = parts[3];
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
    }
  }
  return '';
}

/**
 * Resilient image URL resolver that supports:
 * - Direct Sanity asset objects (with asset.url or asset._ref)
 * - Local static fallback strings (e.g. "fotos/martin.jpg" or "/fotos/martin.jpg")
 * - Default fallbacks
 */
export function resolveImageUrl(source: any, fallbackPath: string = ''): string {
  if (!source) {
    if (!fallbackPath) return '';
    return normalizeSrc(fallbackPath);
  }

  if (typeof source === 'string') {
    return normalizeSrc(source);
  }

  const sanityUrl = urlForImage(source);
  if (sanityUrl) return sanityUrl;

  if (fallbackPath) {
    return normalizeSrc(fallbackPath);
  }

  return '';
}

/**
 * Resilient file URL resolver for documents (e.g. PDF/DOCX)
 */
export function resolveFileUrl(source: any, fallbackPath: string = ''): string {
  if (!source) {
    if (!fallbackPath) return '';
    return normalizeSrc(fallbackPath);
  }

  if (typeof source === 'string') {
    return normalizeSrc(source);
  }

  if (source.asset?.url) {
    return source.asset.url;
  }

  if (fallbackPath) {
    return normalizeSrc(fallbackPath);
  }

  return '';
}
