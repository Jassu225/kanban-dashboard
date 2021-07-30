export const doNotForwardTransientProp = (prop = '') => !prop.startsWith('$');

export const lineClampStyle = (lineClamp) =>
  `
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: ${lineClamp};
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
`;
