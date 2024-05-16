import { v4 as uuidv4 } from 'uuid';
import { HeroImage } from '@/sanity/types/Project';
import Image from 'next/image';
import React from 'react';
export const dynamic = 'force-dynamic'

type HeaderProps = {
  imagesHero: HeroImage[];
};

export default function ProjectHero({ imagesHero }: HeaderProps) {
  return (
    <section className={imagesHero.some(hero => hero._type === 'mobile_image') ? 'has_mobile hero_img section' : 'no_mobile hero_img section'}>
    
    {imagesHero.map((hero) => {
      switch (hero._type) {
        case 'hero_video':
          return (
            <div key={uuidv4()} className={`hero_Video section`}>
              <video autoPlay loop muted playsInline>
                <source src={hero.heroImgUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          );

        case 'mobile_image':
          return (
              <Image
              key={uuidv4()}
                src={hero.heroImgUrl}
                width={700}
                height={700}
                className="homeImgmmobil section"
                alt={`${hero.attribution} `}
                quality={60}
              />

          );

        case 'hero_image':
          return (
              <Image
               key={uuidv4()}
                src={hero.heroImgUrl}
                width={2000}
                height={2000}
                className="homeImg section"
                alt={`${hero.attribution} `}
                quality={60}
              />

          );

        default:
          return null;
      }
    })}
  </section>
  );
}
