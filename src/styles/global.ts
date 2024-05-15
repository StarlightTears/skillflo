import { css } from '@emotion/react';

import composerLayoutStyleSheet from '@day1co/layouts/index.css?raw';

const reset = css`
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    vertical-align: baseline;
    margin: 0;
    padding: 0;
    border: 0;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: '';
    content: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  html {
    font-size: 10px;
  }
`;

const aTagStyle = css`
  a:link {
    background-color: transparent;
    text-decoration: none;
  }

  a:visited {
    background-color: transparent;
    color: black;
    text-decoration: none;
  }

  a:hover {
    background-color: transparent;
    color: black;
    text-decoration: none;
  }

  a:active {
    background-color: transparent;
    color: black;
    text-decoration: none;
  }
`;

const globalStyle = css`
  ${reset}
  ${aTagStyle}

  * {
    box-sizing: border-box;
    font-family: 'Pretendard Variable', 'Noto Sans CJK KR', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .composer-view {
    ${composerLayoutStyleSheet.replace(/:([a-z-]+)-child/g, ':$1-of-type')}
  }
`;

export default globalStyle;
