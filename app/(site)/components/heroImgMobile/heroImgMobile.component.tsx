import { Settings } from "@/sanity/types/Settings";
import Image from 'next/image';
export const dynamic = 'force-dynamic'
type HeaderProps = {
    settings: Settings[];
};

export default function HeroImageMobile({ settings }: HeaderProps) {
    return (
        <>
            {settings.map((siteSetting) => (
                <figure key={siteSetting._id} className="heroImg">
                    {siteSetting.herovisualMobile.length > 0 && (
                        <>
                        {randomHero(siteSetting.herovisualMobile)}
                        </>
                            
                     
                    )}
                </figure>
            ))}
        </>
    );
}

function randomHero(herovisualMobile: string | any[]) {
    if (herovisualMobile.length === 1) {
        const hero = herovisualMobile[0];
        return (
            <>
                    <Image src={hero.heroImgUrl} alt={hero.attribution} 
                     key={hero._key}
                    width={500} height={500}  />
              
            </>
        );
    }
    const randomIndex = Math.floor(Math.random() * herovisualMobile.length);
    const randomHero = herovisualMobile[randomIndex];
    return (
        <>
    
            <Image src={randomHero.heroImgUrl} alt={randomHero.attribution}
              key={randomHero._key}
              width={700} height={700}
                 />
        </>
    );
}
