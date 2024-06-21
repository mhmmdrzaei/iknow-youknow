import { PortableText } from "@portabletext/react";
import {Information} from '@/sanity/types/Information'
import { v4 as uuidv4 } from 'uuid';

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

          <div className="singlePageContent">
          <div className="office-title">Office</div>
          <PortableText value={infoPage.information} components={components as any} />
          </div>
          <div className="pageSideOffice">
            <section className="services">
              <h3>Services</h3>
              <PortableText value={infoPage.services_office} components={components as any} />
            </section>
            <section className="contactOffice">
              <h3>Contact</h3>
              <div className="contactInnerContainer">
                {infoPage.contactInfo.map((contact)=> {
                  return (
                    <div className="contactEach" key={uuidv4()}>
                      <a href={`${contact.urlurl}`} target="_blank" > {contact.urlLabel}</a>
                    </div>
                  )
                })}
              </div>
            </section>
            <section className="contactOffice">
              <h3>Follow us</h3>
              <div className="contactInnerContainer">
                {infoPage.socialInfo.map((social)=> {
                  return (
                    <div className="contactEach" key={uuidv4()}>
                      <a href={`${social.socialURL}`} target="_blank" >{social.socialName}</a>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </section>
      ))}
    </>
  );
}

  