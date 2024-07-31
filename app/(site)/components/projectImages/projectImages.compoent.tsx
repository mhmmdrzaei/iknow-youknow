import { v4 as uuidv4 } from 'uuid';
import { ProjectAssets } from '@/sanity/types/Project';
import Image from 'next/image';
import React from 'react';
import { useMediaQuery } from 'react-responsive';

export const dynamic = 'force-dynamic'

type HeaderProps = {
  images: ProjectAssets[];
};


export default function ProjectImages({ images }: HeaderProps) {
  return (
    <>
      {images.map((items) => {
        const isDesktopOrLaptop = window.innerWidth > 630;

        const maxWidthStyle = isDesktopOrLaptop ? { maxWidth: `${items.width}%` } : {};

        switch (items._type) {
          case 'project_video':
            return (
              <div className="section keen-slider__slide" data-snap-point key={uuidv4()}>
                <div className="projectVideo" style={maxWidthStyle}>
                  <video autoPlay loop muted playsInline>
                    <source src={items.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            );

          case 'projectImage':
            return (
              <div className="section keen-slider__slide" data-snap-point key={uuidv4()}>
                <figure className="projectImg" style={maxWidthStyle}>
                  <Image
                    src={items.url}
                    width={1200}
                    height={1200}
                    className="homeImg"
                    alt={items.attribution ? items.attribution : 'A Project by I Know You Know'}
                    loading="eager"
                    quality={60}
                  />
                </figure>
              </div>
            );

          case 'projectText':
            const markup = { __html: `${items.text}` };
            return (
              <div className="section keen-slider__slide" data-snap-point key={uuidv4()}>
                <div className="videotextContainer">
                  <div className='embedVideoContent' dangerouslySetInnerHTML={markup} />
                </div>
              </div>
            );

          case 'externalVideo':
            return (
              <div className="section keen-slider__slide" data-snap-point key={uuidv4()}>
                <div className="projectVideo" style={maxWidthStyle}>
                  <video autoPlay loop muted playsInline>
                    <source src={items.exVidURL} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
