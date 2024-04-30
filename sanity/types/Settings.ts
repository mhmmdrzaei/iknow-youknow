import { PortableTextBlock } from "sanity";

export type HeroImage = {
  _key: string;
  _type: 'hero_image';
  heroImgUrl: string;
};



export type Settings = {
  _id: string;
  title: string;
  logo: string;
  herovisual: HeroImage[];
  herovisualMobile:HeroImage[];
  seoDescription: string;
  seoImageUrl: string;
};
