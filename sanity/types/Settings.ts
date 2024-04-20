
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
  password: string;
  logo: string;
  _id: string;
  _createdAt: Date;
  title: string;
  email: string;
  latlong: string;
  seoTitle: string;
  seoDescription: string;
  seoImageUrl: string;
  cache: string;
  footerText: string;
  herovisual: HeroVisual[];
};


