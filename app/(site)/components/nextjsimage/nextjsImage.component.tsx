import Image from 'next/image';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Fullscreen } from 'yet-another-react-lightbox/plugins';

import { RenderPhotoProps } from "react-photo-album";

type PhotoType = {
  key: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  _type: string;
  
};

type NextJsImageProps = RenderPhotoProps<PhotoType> & {
  onClick: (index: number) => void;
};



export default function NextJsImage({ photo }: NextJsImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    if (photo._type !== 'project_video') {
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={openLightbox}>
        {photo._type === 'projectImage' ? (
          <Image
            src={photo.src}
            placeholder={'blurDataURL' in photo ? 'blur' : undefined}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        ) : photo._type === 'project_video' ? (
          <video  no-controls="true" autoPlay playsInline loop muted width={photo.width} height={photo.height}>
            <source src={photo.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={photo.src}
            placeholder={'blurDataURL' in photo ? 'blur' : undefined}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        )}
      </div>

      {lightboxOpen && photo._type !== 'project_video' && (
        <Lightbox
          slides={[photo]}
          open={lightboxOpen}
          close={closeLightbox}
          plugins={[Fullscreen]}
        />
      )}
    </div>
  );
}

