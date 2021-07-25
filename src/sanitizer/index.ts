import sanitizeHtml from 'sanitize-html';

export function sanitize(unsanitized: object | string) {
  let cleanObj: any;

  if (typeof unsanitized === 'string') {
    cleanObj = sanitizeHtml(unsanitized, { allowedTags: [] }).trim();
  }
  if (Array.isArray(unsanitized)) {
    cleanObj = unsanitized.map((item) => sanitizeHtml(item, { allowedTags: [] }).trim());
  }
  if (typeof unsanitized === 'object' && unsanitized !== null && !Array.isArray(unsanitized)) {
    cleanObj = {};
    Object.keys(unsanitized).forEach((prop) => {
      cleanObj[prop] = sanitizeHtml(unsanitized[prop], {
        allowedTags: [],
      }).trim();
    });
  }

  return cleanObj;
}
