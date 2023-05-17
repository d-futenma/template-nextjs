import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { css } from '@emotion/react';

const Example: NextPage = () => {
  const title = ['Exampleタイトル'];
  const description = ['Exampleディスクリプション'];
  
  return (
    <>
      <NextSeo
        title={title[0]}
        description={description[0]}
        openGraph={{
          title: title[1] ?? title[0],
          description: description[1] ?? description[0],
        }}
      />

      <section css={section}>
        <div css={div}>
          <h1 css={h1}>Example</h1>
        </div>
      </section>
    </>
  )
}

const section = css`
  position: relative;
`;

const div = css`
  margin: 0 auto;
`;

const h1 = css`
  font-weight: bold;
`;

export default Example;