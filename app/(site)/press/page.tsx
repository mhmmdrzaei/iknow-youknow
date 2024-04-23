import { getsettings, getCat, getPress } from '@/sanity/sanity.utils'
import Header from '../components/header/header.component';
import PressContent from '../components/pressContent/pressContent.component';
import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
export async function generateMetadata(
): Promise<Metadata> {
  const settings = await getsettings()
  return {
    title: `${settings[0].seoTitle} | Press` ,
    description: settings[0].seoDescription,

    openGraph: {
      title: `${settings[0].seoTitle}` ,
      description: settings[0].seoDescription,
      url: 'https://chadharanch.com',
      siteName: 'CHADHA RANCH',

      images: [
        {
          url: 'https://cdn.sanity.io/images/k6c4sqei/production/da9bab630e1b88eaa72e1768026f467a701b7ea3-1200x627.png',
          width: 1200,
          height: 627,
        },
        
        
      ],
      locale: 'en_US',
    type: 'website',
    },
  }
}


export default async function Press() {
  const settings = await getsettings()
  const categories = await getCat()
  const press = await getPress();

    return (
      
     <>


      <main className='pressPage'>
        <section className="pageSide">
          <Header set={settings} cat={categories}/>
        </section>
        <PressContent press={press} />
      </main>
      </>
    )
  }
  