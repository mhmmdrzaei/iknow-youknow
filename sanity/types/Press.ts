import { PortableTextBlock } from "sanity"
export type Press = {
  _id: string,
  title: string,
  pageTitle: string,
  presslistings: PortableTextBlock[],
};

