import { css } from "@emotion/react";
import emotionReset from 'emotion-reset';
import { fontRem, size, media } from "./mixin";

const globalStyles = css`
  /* @font-face {
    font-family: 'example';
    font-style: normal;
    font-weight: 400;
    src:
      url('example.woff') format('woff'),
      url('example.woff2') format('woff2'),
  } */
  ${emotionReset}
  :root {
    --color-font-primary: '#000000';
    --color-link-primary: '#000000';
    --font-family-yugothic: '游ゴシック', YuGothic, 'ヒラギノ角ゴ Pro', 'Hiragino Kaku Gothic Pro', 'メイリオ', 'Meiryo', sans-serif;
  }
  html {
    font-size: 62.5%;
  }
  body {
    ${fontRem(24)}
    color: var(--color-font-primary);
    font-family: var(--font-family-yugothic);
    text-rendering: auto;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  }
  img {
    ${size('100%', 'auto')}
    vertical-align: bottom;
  }
  svg {
    ${size( '100%' )}
    vertical-align: top;
    backface-visibility: hidden;
  }
  button,
  input,
  select,
  textarea {
    appearance: none;
    background: none;
    border-radius: 0;
    border: 0;
    display: block;
    font-family: var(--font-family-yugothic);
    font-size: 100%;
    margin: 0;
    outline: none;
    padding: 0;
  }
  button,
  input,
  label,
  select {
    cursor: pointer;
  }
  main,
  section {
    position: relative;
  }
  a {
    color: var(--color-link-primary);
    text-decoration: none;
  }
  ${media.sp(css`
    .pc {
      display: none;
    }
  `)}
  ${media.pc(css`
    .sp {
      display: none;
    }
  `)}
  .wrapper{
    overflow: hidden;
  }
`;

export default globalStyles;
