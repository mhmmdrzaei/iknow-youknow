import { v4 as uuidv4 } from 'uuid';
import { ProjectAssets } from '@/sanity/types/Project';
import Image from 'next/image';
import React from 'react';

export const dynamic = 'force-dynamic'

type HeaderProps = {
  images: ProjectAssets[];
};

export default function ProjectImages({ images }: HeaderProps) {
  return (
    <>
    
      {images.map((items) => {
        switch (items._type) {
          case 'project_video':
            return (
              <div key={uuidv4()} className="projectVideo"
              style={{width:`${items.width}%` }}
              >
                <video autoPlay loop muted playsInline>
                  <source src={items.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );

          case 'projectImage':
            return (
              <figure key={uuidv4()} 
              className="projectImg"
              style={{width:`${items.width}%` }}>
                <Image
                  src={items.url}
                  width={1200}
                  height={1200}
                  className="homeImg"
                  alt={`${items.attribution} `}
                  loading="eager"
                  quality={60}
                />
              </figure>
            );

          case 'projectText':
            const markup = { __html: `${items.text}` };
          return (
            <div className="videotextContainer">
              <div className='embedVideoContent' key={uuidv4()} dangerouslySetInnerHTML={markup} />
            </div>
          )

          case 'externalVideo':
            return (
              <div key={uuidv4()} className="projectVideo"
              style={{width:`${items.width}%` }}>
                <video autoPlay loop muted playsInline>
                  <source src={items.exVidURL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            );

          default:
            return null;
        }
      })}
    
    </>
  );
}
