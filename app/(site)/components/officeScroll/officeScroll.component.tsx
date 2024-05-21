"use client"
import { useEffect, useRef } from 'react'
import { useRouter,usePathname } from 'next/navigation'

const RedirectToOffice = () => {
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          router.push('/office');
        }
      },
      { threshold: 0.1 } // Adjust the threshold as needed
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [router]);

  return <div ref={ref} style={{ height: '1vh', background: 'transparent' }}  data-snap-point />;
};

export default RedirectToOffice;