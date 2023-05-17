import React, { FC } from 'react';

interface SvgUseProps {
  id: string;
  title?: string;
  url?: string;
}

const SvgUse: FC<SvgUseProps> = ({ id, title = '', url = '' }) => (
  <svg>
    {title && <title>{title}</title>}
    <use xlinkHref={`${url}#${id}`} />
  </svg>
);

export default SvgUse;