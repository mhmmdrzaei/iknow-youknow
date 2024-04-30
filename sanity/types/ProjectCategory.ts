import { PortableTextBlock } from "next-sanity";

export type ProjectCategory = {
  _id: string;
  name: string;
  slug: string;
  sort: number;
  cat_desc:PortableTextBlock[];
};