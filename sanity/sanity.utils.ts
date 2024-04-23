// sanity.utils
import { createClient, groq } from "next-sanity";
import clientConfig from './config/client-config'
import { Settings } from "./types/Settings";
import { Information } from "./types/Information";
import { SingleProject } from "./types/Project"
import { ProjectCategory } from "./types/ProjectCategory";



export async function getsettings(): Promise<Settings[]> {
    return createClient(clientConfig).fetch(
      `*[_type == "siteSettings"]{
        _id,
       title,
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

  export async function getProjects(): Promise<SingleProject[]> {
    return createClient(clientConfig).fetch(
      groq`*[_type == "singleProject"]{
        _id,
        title,
        "slug": slug.current,
        visible,
        clientName,
        shortProjectDescription,
        "categoryName": category->name, // Include the category name
        "categorySlug": category->slug.current, 
        sort,
        projectDate,
        "projectHerovisual": projectHerovisual[]{
          _key,
          _type,
          "heroImgUrl": asset->url,
          attribution
       },

        
    }`,
    )
  }
  export async function getProject(slug: string): Promise<SingleProject> {
    return createClient(clientConfig).fetch(
      groq`*[_type == "singleProject"&& slug.current == $slug][0]{
        id,
        title,
        "slug": slug.current,
        visible,
        projectdescription,
        password,
        "categoryName": category->name, // Include the category name
        "categorySlug": category->slug.current, 
       
        "projectHerovisual": projectHerovisual[]{
          _key,
          _type,
          "heroImgUrl": asset->url,
          attribution
       },
        "projectImages": projectImages[]{
          "url": asset->url,
          attribution,
          _type,
          width,
         text
        },
       "seo": seo_project{
         description,
         seo_image {
           "seo_image": asset->url
       }
         },
      creditsProject[]{
          _key,
         creditLabel,
         creditName
         
         
       }
        
    }`,
    )
  }
  export async function getInformation(): Promise<Information[]>{
    return createClient(clientConfig).fetch(
      groq`*[_type == "information"]{
        _id,
        title,
        information,
        services_office,
        contactInfo[]{
          urlLabel,
          urlurl,
          _key
        },
        socialInfo[] {
          _key,
          socialName,
          socialURL  
        }
        
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
        cat_desc
      
        
    }`,

    )
  }

