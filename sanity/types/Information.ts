import { PortableTextBlock } from "sanity"
export type Information = {
  _id: string,
  title: string,
  pageTitle: string,
  information: PortableTextBlock[],
};