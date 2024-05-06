"use client"
import { useEffect } from 'react'
import { useRouter,usePathname } from 'next/navigation'

const ScrollToBottomDetector = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const hasDisplayed = localStorage.getItem('hasDisplayed');

    function handleScroll() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = (window.scrollY || document.documentElement.scrollTop)  ;

      if (!hasDisplayed && windowHeight + scrollTop >= documentHeight && pathname !== '/office') {
        router.push('/office');
        localStorage.setItem('hasDisplayed', 'true');
      }
    }

    if (!hasDisplayed) {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [router, pathname]);

  // Remove the flag from local storage when the user closes the browser window or navigates away from the page
  useEffect(() => {
    const cleanupLocalStorage = () => {
      localStorage.removeItem('hasDisplayed');
    };

    window.addEventListener('beforeunload', cleanupLocalStorage);

    return () => {
      window.removeEventListener('beforeunload', cleanupLocalStorage);
    };
  }, []);

  return null; // Render nothing if the component shouldn't be displayed
};

export default ScrollToBottomDetector;