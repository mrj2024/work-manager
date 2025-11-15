import sanitizeHtml from 'sanitize-html';

export const sanitizeRichText = (input = '') => {
  return sanitizeHtml(input, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'h4', 'img']),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt', 'title']
    }
  });
};
