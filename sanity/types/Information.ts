import { PortableTextBlock } from "sanity";

export type Social = {
  _type: 'social',
  socialName: string,
  socialURL: string,
};

export type Contact = {
  _type: 'contact',
  urlLabel: string,
  urlurl: string,
};

export type Information = {
  _id: string,
  title: string,
  url: string,
  pageTitle: string,
  information: PortableTextBlock[],
  services_office: PortableTextBlock[],
  contactInfo: Contact[],
  socialInfo: Social[],
};
