import { PortableTextBlock } from "sanity";

export type ProjectImage = {
  _type: 'projectImage';
  attribution: string;
  width: string;
  url: string;
};

export type ProjectVideo = {
  _type: 'project_video';
  attribution: string;
  width: string;
  url: string;
  
};

export type ProjectText = {
  _type: 'projectText';
  text: string;
  url: string;
  width: string;
};
export type ExternalVideo = {
  _type: 'externalVideo';
  exVidURL: string;
  width: string;

}

export type ProjectAssets = ProjectImage | ProjectVideo | ProjectText | ExternalVideo ;

export type SeoProject = {
  description: string;
  seo_image?: string; 
};

export type HeroImage = {
  _key: string;
  _type: string;
  heroImgUrl: string;
  attribution: string;
  map: (callbackfn: (value: any, index: number, array: any[]) => any, thisArg?: any) => any[];
  some: (callbackfn: (value: any, index: number, array: any[]) => unknown, thisArg?: any) => boolean;
  
}

export type SingleProject = {
  map(arg0: (items: any) => import("react").JSX.Element | null): unknown;
  _id: string;
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  sort: number;
  visible: boolean;
  password?: string;
  projectdescription: PortableTextBlock[];
  projectDate: string;
  clientName: string;
  shortProjectDescription: string;
  categoryName: string;
  categorySlug: string;
  
  creditsProject: {
    _key: string;
    creditLabel: string;
    creditName: string;
  }[];
  projectHerovisual: HeroImage;
  projectImages: ProjectAssets[];
  seo_project: SeoProject;
};
