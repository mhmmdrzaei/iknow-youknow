"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ScrollToBottomDetector = () => {
  const router = useRouter()

  useEffect(() => {
    function handleScroll() {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      if (windowHeight + scrollTop >= documentHeight) {
        router.push('/office')
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [router])

  return <div id="scrollToBottomDetector" style={{ height: '1px', position: 'absolute', bottom: '0' }} />
}

export default ScrollToBottomDetector
