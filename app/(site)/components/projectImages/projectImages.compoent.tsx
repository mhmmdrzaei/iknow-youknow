
import { v4 as uuidv4 } from 'uuid';
import { SingleProject } from '@/sanity/types/Project';
import NextJsImage from '../nextjsimage/nextjsImage.component';
import Image from 'next/image';



type HeaderProps = {
  images: SingleProject;
};

export default function ProjectImages({ images }: HeaderProps) {


  return (
    <>
    {images.map((items) => {


      if (items._type === 'casting_video') {
          return (
              <div key={uuidv4()} className={`videoCasting ${(items.width)} `}>
                  <video autoPlay loop muted playsInline>
                      <source src={items.url} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                  {items?.caption ? <span>{items.caption}</span> : null}
              </div>
          )
      } else if (items._type === 'casting_image') {
          return (
              <figure key={uuidv4()} className={`castingImg ${(items.width)}  `}>
                  <Image src={items.url} width={700} height={700} className="homeImg" alt={`${items.attribution} 
                  `} loading="eager" quality={60} />
                  {items?.caption ? <span>{items.caption}</span> : null}
                  
              </figure>
          )
      } else {
          return null; 
      }

  })}
    </>
  );

}