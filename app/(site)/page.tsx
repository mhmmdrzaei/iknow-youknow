import { getsettings, getCat, getProjects } from '@/sanity/sanity.utils'
import Header from './components/header/header.component'
import ProjectListing from './components/projectListing/projectListing.component'
import HeroImage from './components/heroImg/heroImg.component'
import ScrollToBottomDetector from './components/officeScroll/officeScroll.component'

import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
 
// export async function generateMetadata(
// ): Promise<Metadata> {
//   const settings = await getsettings()
//   return {
//     title: `${settings[0].seoTitle}` ,
//     description: settings[0].seoDescription,

//     openGraph: {
//       title: `${settings[0].seoTitle}` ,
//       description: settings[0].seoDescription,
//       url: 'https://chadharanch.com',
//       siteName: 'CHADHA RANCH',

//       images: [
//         {
//           url: 'https://cdn.sanity.io/images/k6c4sqei/production/da9bab630e1b88eaa72e1768026f467a701b7ea3-1200x627.png',
//           width: 1200,
//           height: 627,
//         },
        
        
//       ],
//       locale: 'en_US',
//     type: 'website',
//     },
//   }
// }


export default async function Home() {
  const settings = await getsettings()
  const categories = await getCat()
  const projects = await getProjects()
  return (
   
    <main>
        <Header set={settings} projects={projects} categories={categories}/>

      
      <section className="pageMain">
      <HeroImage settings={settings}/>

        <ProjectListing projects={projects} categories={categories}/>

      </section>
      <ScrollToBottomDetector />
    </main>
  )
}
