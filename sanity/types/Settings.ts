import { PortableTextBlock } from "sanity";

export type HeroImage = {
  _key: string;
  _type: 'hero_image';
  heroImgUrl: string;
};

export type HeroVideo = {
  _key: string;
  _type: 'hero_video';
  heroImgUrl: string;
};

export type HeroVisual = HeroImage | HeroVideo;

export type Settings = {
  _id: string;
  title: string;
  logo: string;
  herovisual: (HeroImage | HeroVideo)[];
  seo: SeoInfo;
};


export type SeoInfo = {
  _type: 'seo';
  title: string;
  description: string;
  seoImageUrl?: string;
};