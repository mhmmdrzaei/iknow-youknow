import { PortableTextBlock } from "sanity";

export type ProjectImage = {
  _type: 'image';
  attribution: string;
  width: string;
  heroImgUrl: string;
};

export type ProjectVideo = {
  _type: 'file';
  attribution: string;
  width: string;
  heroImgUrl: string;
};

export type ProjectText = {
  _type: 'object';
  Text: string;
  heroImgUrl: string;
  width: string;
};

export type ProjectAssets = ProjectImage | ProjectVideo | ProjectText;

export type SeoProject = {
  description: string;
  seo_image?: string; 
};

export type SingleProject = {
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
  projectHerovisual: (ProjectImage | ProjectVideo | ProjectText)[];
  projectImages: ProjectAssets[];
  seo_project: SeoProject;
};
