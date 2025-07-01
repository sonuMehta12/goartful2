// components/GoogleTagManager.tsx
'use client' 
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// Add this before using window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// This function helps to push data to the dataLayer
export const pageview = (url: string) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    })
  }
}

export default function GoogleTagManager() {
  const pathname = usePathname()

  // This effect will run on every route change, pushing a new pageview event.
  useEffect(() => {
    if (GTM_ID) {
      pageview(pathname)
    }
  }, [pathname])

  // Only render the GTM script if the GTM_ID is available
  if (!GTM_ID) {
    return null
  }

  return (
    <>
      {/* The GTM script is injected into the head of the document. */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      
      {/* The GTM noscript iframe is added to the body. */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  )
}