import { Settings } from "@/sanity/types/Settings";
import Image from 'next/image';
export const dynamic = 'force-dynamic'
type HeaderProps = {
    settings: Settings[];
};

export default function HeroImage({ settings }: HeaderProps) {
    return (
        <>
            {settings.map((siteSetting) => (
                <figure key={siteSetting._id} className="heroimg">
                    {siteSetting.herovisual.length > 0 && (
                        <>
                            {randomHero(siteSetting.herovisual)}
                            
                        </>
                    )}
                </figure>
            ))}
        </>
    );
}

function randomHero(herovisual: string | any[]) {
    // If there's only one asset, return it
    if (herovisual.length === 1) {
        const hero = herovisual[0];
        return (
            <>

            <Image src={hero.heroImgUrl} alt={hero.attribution} 
                     key={hero._key}
                    width={2000} height={2000} />

                    
              
            </>
        );
    }
    // If there are multiple assets, randomly select one
    const randomIndex = Math.floor(Math.random() * herovisual.length);
    const randomHero = herovisual[randomIndex];
    return (
        <>
    
                <Image src={randomHero.heroImgUrl} alt={randomHero.attribution}
              key={randomHero._key}
              width={2000} height={2000}
                 />
        </>
    );
}
