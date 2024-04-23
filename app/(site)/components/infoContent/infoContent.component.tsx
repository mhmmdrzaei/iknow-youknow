import { PortableText } from "@portabletext/react";
import {Information} from '@/sanity/types/Information'

export const dynamic = 'force-dynamic'

type LinkMark = {
  blank?: boolean;
  href: string;
};

type Components = {
  marks: {
    link: (props: { value: LinkMark; children: React.ReactNode }) => React.ReactNode;
  };
};

type HeaderProps = {
  info: Information[];
};

const components: Components = {
  marks: {
    link: ({ value, children }) => {
      const { blank, href } = value;
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
};

export default function InfoContent({ info }: HeaderProps) {
  return (
    <>
      {info.map((infoPage) => (
        <section className="pageMain singlePage" key={infoPage._id}>
          <h2>{infoPage.pageTitle}</h2>
          <div className="singlePageContent">
          <PortableText value={infoPage.information} components={components as any} />
          </div>
        </section>
      ))}
    </>
  );
}

  