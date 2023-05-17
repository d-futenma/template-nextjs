import { css } from '@emotion/react';

const SvgSprites = () => {
  return (
    <svg css={svg}>
      <defs>
      </defs>
    </svg>
  );
};

const svg = css`
  height: 0;
  opacity: 0;
  position: absolute;
  width: 0;
  z-index: -999;
`;

export default SvgSprites;