/**
 * Was available in @ember-data/adapter/error until v5.
 * Vendor and apply types to the last available version:
 * https://github.com/emberjs/data/blob/v4.12.1/packages/adapter/src/error.js
 */

interface ErrorArrayEntry {
  title: string;
  detail: unknown;
  source: {
    pointer: string;
  };
}

const SOURCE_POINTER_REGEXP = /^\/?data\/(attributes|relationships)\/(.*)/;
const SOURCE_POINTER_PRIMARY_REGEXP = /^\/?data/;
const PRIMARY_ATTRIBUTE_KEY = 'base';

export function errorsArrayToHash(
  errors: ErrorArrayEntry[]
): Record<string, unknown[]> {
  const out: Record<string, unknown[]> = {};

  if (errors) {
    errors.forEach((error) => {
      if (error.source && error.source.pointer) {
        const match = error.source.pointer.match(SOURCE_POINTER_REGEXP);

        let key;
        if (match) {
          key = match[2];
        } else if (
          error.source.pointer.search(SOURCE_POINTER_PRIMARY_REGEXP) !== -1
        ) {
          key = PRIMARY_ATTRIBUTE_KEY;
        }

        if (key) {
          out[key] = out[key] || [];
          out[key].push(error.detail || error.title);
        }
      }
    });
  }

  return out;
}
