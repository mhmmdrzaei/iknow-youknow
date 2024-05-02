"use client"
import { useState, useEffect } from 'react';
import HeroImage from '../heroImg/heroImg.component'; 
import HeroImageMobile from '../heroImgMobile/heroImgMobile.component'; 
import { Settings } from "@/sanity/types/Settings";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
type HeroContainerProps = {
    settings: Settings[];
};

const minWidthForDesktop = 500; // Minimum width for desktop view

export default function HeroContainer({ settings }: HeroContainerProps) {
    // Scroll to the section with id "categories" when the component is clicked
    const handleClick = () => {
        const categoriesSection = document.getElementById('categories');
        if (categoriesSection) {
            categoriesSection.scrollIntoView({ behavior: 'smooth' });
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
        <Swiper
        spaceBetween={100}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
        <section className='heroSection' onClick={handleClick} >
            <HeroComponent settings={settings}  />;
            <h1>I Know You Know</h1>
        </section>

        </SwiperSlide>

        </Swiper>
    )
    

}
