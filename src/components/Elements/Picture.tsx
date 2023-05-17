import { useState, useEffect } from 'react';
import config from '../../config';

interface Props {
  src: string;
  alt: string;
  retina?: boolean;
  lazyLoad?: boolean;
}

const Picture: React.FC<Props> = ({ src, alt, retina = true, lazyLoad = true }) => {
  const ext = src.split('.').pop()?.toLowerCase();
  const loading = lazyLoad ? 'lazy' : undefined;
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
  const subDirectory = src.split('/').length > 1 ? src.split('/').slice(0, -1).join('/') + '/' : '';
  const path = `${config.path.img.dir}${subDirectory}`;
  const doubleSlashRegex = /\/+/g;

  useEffect(() => {
    const img = new Image();
    img.src = `${path}${config.path.img.pc}${src.split('/').pop()}`.replace(doubleSlashRegex, '/');
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
    };
  }, [src]);

  const generateSourceSet = (src: string) => {
    if (retina) {
      return `${path}${config.path.img.pc}${src.split('/').pop()}`.replace(doubleSlashRegex, '/') + `, ${path}${config.path.img.pc}${src.replace(`.${ext}`, `@2x.${ext}`).split('/').pop()} 2x`.replace(doubleSlashRegex, '/');
    } else {
      return `${path}${config.path.img.pc}${src.split('/').pop()}`.replace(doubleSlashRegex, '/');
    }
  };

  return (
    <picture>
      <source media={`(max-width: ${config.sp.breakpoint}px)`} srcSet={`${path}${config.path.img.sp}${src.split('/').pop()}`.replace(doubleSlashRegex, '/')} />
      <source media={`(min-width: ${config.pc.breakpoint}px)`} srcSet={generateSourceSet(src)} />
      <img src={`${path}${config.path.img.pc}${src.split('/').pop()}`.replace(doubleSlashRegex, '/')} alt={alt} width={imgSize?.width} height={imgSize?.height} loading={loading} />
    </picture>
  );
};

export default Picture;