import { PortableTextBlock } from "sanity"

export type Project = {
  _id: string,
  name: string, 
  title: string,
  visible: boolean,
  projectdescription: PortableTextBlock[],
  projectDate: string,
  projectMedium: string,
  mainImage: string, // Corrected casing
  categoryName: string, 
  categorySlug: string,
  slug: string,
  password: string,
  sort: number,
  projectAssets: ProjectAsset[], // Added type for projectAssets
  seo_project: SeoProject // Added type for seo_project
};

export type ProjectAsset = {
  projectImage?: ProjectImage,
  projectVideo?: ProjectVideo
};

export type ProjectImage = {
  attribution: string,
  width: number
};

export type ProjectVideo = {
  attribution: string,
  width: number
};

export type SeoProject = {
  description: string,
  seo_image?: string // You might want to specify the type according to your schema
};
