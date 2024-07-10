"use client"
import { useState, useEffect } from 'react';
import HeroImage from '../heroImg/heroImg.component'; 
import HeroImageMobile from '../heroImgMobile/heroImgMobile.component'; 
import { Settings } from "@/sanity/types/Settings";
import { v4 as uuidv4 } from 'uuid';
export const dynamic = 'force-dynamic'
type HeroContainerProps = {
    settings: Settings[];
};

const minWidthForDesktop = 640; // Minimum width for desktop view

export default function HeroContainer({ settings }: HeroContainerProps) {
    // Scroll to the section with id "categories" when the component is clicked
    const handleClick = () => {
        const targetId = window.innerWidth >= minWidthForDesktop ? 'categories' : 'homeMain';
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= minWidthForDesktop);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const HeroComponent = isDesktop ? HeroImage : HeroImageMobile;



    return (
        <section className='heroSection section keen-slider__slide' data-snap-point onClick={handleClick} id='header'>
            <HeroComponent settings={settings}  />;
            {settings.map((setting) => ( 
                  
                    <img src={setting.logo} className='logoLarge' key={uuidv4()}/>
             
                ))}
        </section>




    )
    

}
