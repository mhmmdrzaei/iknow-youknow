// sanity.utils
import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'
import { Settings } from "./types/Settings";
import { Information } from "./types/Information";
import { Press } from "./types/Press";
import { Project } from "./types/Project"
import { ProjectCategory } from "./types/ProjectCategory";



export async function getsettings(): Promise<Settings[]> {
    return createClient(clientConfig).fetch(
      `*[_type == "siteSettings"]{
        _id,
       email,
       latlong,
       title,
       footerText, 
       "herovisual": herovisual[]{
          _key,
          _type,
          "heroImgUrl": asset->url,
          _type
       },
      "logo": site_log.asset->url,
      "seoTitle": seo.title,
      "seoDescription": seo.description,
      "seoImageUrl": seo.seo_image.asset->url,
       
       
 }`
    )
  }

  export async function getProjects(): Promise<Project[]> {
    return createClient(clientConfig).fetch(
      groq`*[_type == "singleProject"]{
        _id,
        title,
        "slug": slug.current,
        visible,
        projectdescription,
        projectDate,
        shortProjectDescription,
        "categoryName": category->name, // Include the category name
        "categorySlug": category->slug.current, 
        sort,
        "projectHerovisual": projectHerovisual[]{
          _key,
          _type,
          "heroImgUrl": asset->url,
          name,
          attribution
       },

        
    }`,
    )
  }
  export async function getProject(slug: string): Promise<Project> {
    return createClient(clientConfig).fetch(
      groq`*[_type == "singleProject"&& slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        visibility,
        projectdescription,
        projectDate,
        password,
        projectLocation,
        "categoryName": category->name, // Include the category name
        "categorySlug": category->slug.current, 
        projectMedium,
        "mainimage": mainimage.asset->url,
        "projectImages": projectImages[]{
          "url": asset->url,
          attribution,
          _type
        }


        
        
    }`,
    )
  }
  export async function getInformation(): Promise<Information[]>{
    return createClient(clientConfig).fetch(
      groq`*[_type == "information"]{
        _id,
        title,
        pageTitle,
        information,
        
    }`,

    )
  }
  export async function getPress(): Promise<Press[]>{
    return createClient(clientConfig).fetch(
      groq`*[_type == "press"]{
        _id,
        title,
        pageTitle,
        presslistings,
        
    }`,

    )
  }

  export async function getCat(): Promise<ProjectCategory[]>{
    return createClient(clientConfig).fetch(
      groq`*[_type == "projectCategory" ]{
        _id,
        name,
        sort,
        "slug": slug.current,
        description
      
        
    }`,

    )
  }

