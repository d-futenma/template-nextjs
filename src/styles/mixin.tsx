import { css, SerializedStyles } from '@emotion/react'
import config from '../config';

/**
 * px追加。単位（px|rem|vw|vh|calc）が付いている場合はそのまま返す。
 */
export const addPixel = (num: string | number): string => typeof num === 'number' ? `${num}px` : num;


/**
 * パーセントを計算で割り出す
 * @example
 * ${percentage(320, 960)}
 */
export const percentage = (num: number, total: number): string => {
  const result = (num / total) * 100
  return result.toString() + '%';
};


/**
 * vwに変換
 * @example
 * ${vwsp(650)}
 */
export const vwsp = (num: number): string => {
  const rate = num / config.sp.canvasWidth * 100;
  return rate.toString() + 'vw';
};

export const vwpc = (num: number): string => {
  const rate = num / config.pc.canvasWidth * 100;
  return rate.toString() + 'vw';
};


/**
 * サイズ指定
 * @example
 * ${size(500, 250)}
 */
export const size = (width: string | number, height: string | number = width): SerializedStyles => css`
  width : ${addPixel(width)};
  height: ${addPixel(height)};
`;


/**
 * コンテンツをセンタリング
 * @example
 * ${contentCentering(960)}
 */
export const contentCentering = (width: string | number): SerializedStyles => css`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: ${addPixel(width)};
`;

/**
 * コンテンツを上下左右センタリング
 * @example
 * ${centering({ type: 'absolute' })}
 * ${centering({ type: 'translate' })}
 * ${centering('500px', '250px')}
 */
export const centering = (
  width : string | null = null,
  height: string | null = width,
  { type }: { type?: 'absolute' | 'translate' } = { type: undefined }
): SerializedStyles => {
  if (width) {
    return css`
      ${size(parseInt(width, 10), parseInt(height || '0', 10))}
      position: absolute;
      top: 50%;
      left: 50%;
      margin: ${parseInt(height || '0', 10) / -2}px 0 0 ${parseInt(width, 10) / -2}px;
    `;
  } else if(type) {
    switch (type) {
      case 'absolute':
        return css`
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        `;
      case 'translate':
        return css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `;
      default:
        return css``;
    }
  } else {
    return css``;
  }
};


/**
 * フォントサイズと行間サイズからline-heightを算出
 * @example
 * ${lineHeight(24, 34)}
 */
export const lineHeight = (fontSize: number, lineHeightSize: number): SerializedStyles => css`
  line-height: ${lineHeightSize / fontSize};
`;


/**
 * letter-spacingの値をemで設定
 * @example
 * ${letterSpacing(100)}
 */
export const letterSpacing = (letterSpacingSize: number): SerializedStyles => css`
  letter-spacing: ${letterSpacingSize / 1000}em;
`;


/**
 * font-size（px|rem|vw）、line-height、letter-spacingをセットで生成
 * @example
 * ${fontPixel(20)} // フォントサイズ20pxのcssを生成
 * ${fontRem(20, 30, 100)} // フォントサイズ2rem、行間1.5倍、文字間隔0.1emのcssを生成
 */
export const fontPixel = (fontSize: number, lineHeightSize: number | null = null, letterSpacingSize: number | null = null): SerializedStyles => css`
  ${letterSpacingSize !== null ? letterSpacing(letterSpacingSize) : null};
  ${lineHeightSize !== null ? lineHeight(fontSize, lineHeightSize) : null};
  font-size: ${fontSize}px;
`;

export const fontRem = (fontSize: number, lineHeightSize: number | null = null, letterSpacingSize: number | null = null): SerializedStyles => css`
  ${letterSpacingSize !== null ? letterSpacing(letterSpacingSize) : null};
  ${lineHeightSize !== null ? lineHeight(fontSize, lineHeightSize) : null};
  font-size: ${fontSize / 10}rem;
`;

export const fontVW = (fontSize: number, lineHeightSize: number | null = null, letterSpacingSize: number | null = null): SerializedStyles => css`
  ${letterSpacingSize !== null ? letterSpacing(letterSpacingSize) : null};
  ${lineHeightSize !== null ? lineHeight(fontSize, lineHeightSize) : null};
  font-size: ${fontSize / config.sp.canvasWidth * 100}vw;
`;


/**
 * 10pxより小さいfont-size指定
 * @example
 * ${smallText(0.8)}
 */
export const smallText = (size: number): SerializedStyles => css`
  display: inline-block;
  transform-origin: 0 0;
  transform: scale(${size});
`;


/**
 * 文字置換
 * @example
 * ${textReplace()}
 */
export const textReplace = (): SerializedStyles => css`
  overflow: hidden;
  text-decoration: none;
  text-indent: 100%;
  white-space: nowrap;
`;

/**
 * メディアクエリ
 * @example
 * ${media.pc(css`
 *   .sp {
 *     display: none;
 *   }
 *`)}
 */
type Media = (style: SerializedStyles) => SerializedStyles;

export const media = Object.keys(config.mediaQueries).reduce((acc, label) => {
  acc[label as keyof typeof config.mediaQueries] = (style: SerializedStyles) => css`
    @media ${config.mediaQueries[label as keyof typeof config.mediaQueries]} {
      ${style};
    }
  `;
  return acc;
}, {} as Record<keyof typeof config.mediaQueries, Media>);


/**
 * 背景画像指定
 * @example
 * ${bgImg('example.png', 'center top', 'no-repeat')}
 * ${bgImg('example.png', 'left center', 'no-repeat', '#fff', 'cover')}
 */
export const bgImg = (
  fileName: string,
  position: string = 'center top',
  repeat  : string | null = null,
  bgColor : string | null = null,
  bgSize  : string | null = null
): SerializedStyles => css`
  ${bgSize ? `background-size: ${bgSize};` : ''}
  background: url(${fileName}) ${position} ${repeat} ${bgColor};
`;


/**
 * 背景画像指定（複数）
 * @example
 * ${bgImgMultiple({
 *   fileName : ['example1.png', 'example2.png'],
 *   positions: ['center top', 'left center'],
 *   repeat   : ['no-repeat', 'repeat-x'],
 *   bgColor  : ['#fff', '#000'],
 *   sizes    : ['50px 100px', '100%'],
 * })}
 */
export const bgImgMultiple = ({
  fileName,
  positions = [],
  repeat = [],
  bgColor = [],
  sizes = [],
}: {
  fileName: string[];
  positions?: string[];
  repeat?: string[];
  bgColor?: string[];
  sizes?: string[];
}): SerializedStyles => css`
  background-image: ${fileName
    .map(
      (image, index) =>
        `url(${image}) ${positions[index] ?? ''} ${repeat[index] ?? ''} ${bgColor[index] ?? ''} ${sizes[index] ?? ''}`
    )
    .join(', ')};
`;


/**
 * 要素の表示・非表示
 * @example
 * ${toggleDisplay(true)}
 * ${toggleDisplay(false, 'transition', 0.3, 'ease-out' )}
 */
export const toggleDisplay = (
  visible   : boolean,
  transition: 'transition' | null = null,
  duration  : number = 0.5,
  easing    : string = ''
): SerializedStyles => css`
  ${transition !== null ? `transition: opacity ${duration}s ${easing}, visibility ${duration}s ${easing};` : null};
  opacity: ${visible ? 1 : 0};
  pointer-events: ${visible ? 'auto' : 'none'};
  visibility: ${visible ? 'visible' : 'hidden'};
`;
