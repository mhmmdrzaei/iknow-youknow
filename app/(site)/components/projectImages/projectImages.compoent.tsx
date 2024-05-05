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
              <div className="section">
              <div key={uuidv4()} className="projectVideo"
              style={{maxWidth:`${items.width}%` }}
              >
                <video autoPlay loop muted playsInline>
                  <source src={items.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              </div>

            );

          case 'projectImage':
            return (
              <div className="section">
                <figure key={uuidv4()} 
              className="projectImg"
              style={{maxWidth:`${items.width}%` }}>
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

              </div>
              
            );

          case 'projectText':
            const markup = { __html: `${items.text}` };
          return (
            <div className="section">
            <div  key={uuidv4()} className="videotextContainer">
              <div className='embedVideoContent' key={uuidv4()} dangerouslySetInnerHTML={markup} />
            </div>
            </div>

          )

          case 'externalVideo':
            return (
              <div className="section">
                <div key={uuidv4()} className="projectVideo"
                style={{maxWidth:`${items.width}%` }}>
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
