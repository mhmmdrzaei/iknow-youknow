import { getsettings, getCat, getProjects } from '@/sanity/sanity.utils';
import Header from './components/header/header.component';
import ProjectListing from './components/projectListing/projectListing.component';
import ScrollToBottomDetector from './components/officeScroll/officeScroll.component';
import type { Metadata } from 'next';
import HeroContainer from './components/heroContainer/heroContainer.component';
import CategoriesHome from './components/categories/categories.component';
import ConditionalScrollComponent from './components/conditionalScrollComponent/conditionalScrollComponent.component';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getsettings();
  return {
    title: `${settings[0].title}`,
    description: settings[0].seoDescription,
    openGraph: {
      title: `${settings[0].title}`,
      description: settings[0].seoDescription,
      url: 'https://iknow-youknow.com',
      siteName: `${settings[0].title}`,
      images: [
        {
          url: `${settings[0].seoImageUrl}`,
          width: 1200,
          height: 628,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  };
}

export default async function Home() {
  const settings = await getsettings();
  const categories = await getCat();
  const projects = await getProjects();

  return (
    <main>
      <ConditionalScrollComponent>
        <HeroContainer settings={settings} />
        <section className="pageMain homepage" id="homeMain">
          <Header set={settings} projects={projects} categories={categories} />
          <CategoriesHome categories={categories} />
          <ProjectListing projects={projects} categories={categories} />
        </section>
        <section className="section officeSection" data-snap-point>
          <ScrollToBottomDetector />
        </section>
      </ConditionalScrollComponent>
    </main>
  );
}
