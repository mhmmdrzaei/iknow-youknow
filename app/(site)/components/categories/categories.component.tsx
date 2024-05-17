"use client"
import { PortableText } from 'next-sanity';
import { ProjectCategory } from '@/sanity/types/ProjectCategory';
export const dynamic = 'force-dynamic'

type HeaderProps = {
    categories: ProjectCategory[]
};

const CategoriesHome = ({ categories }: HeaderProps) => {
  
    const handleClick = (slug: string) => {
      const element = document.getElementById(slug);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };
  
    return (
      <div className="section keen-slider__slide">
        <section className="categoriesContainer" id="categories">
          {categories.map((category) => (
            <section key={category._id} className="categoryEach" onClick={() => handleClick(category.slug)}>
              <div className="categoryName">
                <h2>{category.name}</h2>
              </div>
              <div className="categoryDescription">
                <PortableText value={category.cat_desc} />
              </div>
            </section>
          ))}
        </section>

      </div>

    );
  };
  
  export default CategoriesHome;