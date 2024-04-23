import { PortableText } from "@portabletext/react";
import {Press} from '@/sanity/types/Press'

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
  press: Press[];
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

export default function PressContent({ press }: HeaderProps) {
  return (
    <>
      {press.map((pressPage) => (
        <section className="pageMain singlePage" key={pressPage._id}>
          <h2>{pressPage.pageTitle}</h2>
          <div className="singlePageContent">
          <PortableText value={pressPage.presslistings} components={components as any} />
          </div>
        </section>
      ))}
    </>
  );
}

  