// import { Html, Head, Main, NextScript } from 'next/document';

// const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
// const isProd = process.env.NODE_ENV === 'production';

// // Placeholder for consent management
// const hasConsent = () => {
//   // TODO: Replace with real consent check (e.g., from a consent manager)
//   return true;
// };

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head>
//         {/* Google Tag Manager - Head */}
//         {isProd && hasConsent() && GTM_ID && (
//           <script
//             dangerouslySetInnerHTML={{
//               __html: `
//                 (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
//                 new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
//                 j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
//                 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
//                 })(window,document,'script','dataLayer','${GTM_ID}');
//               `,
//             }}
//           />
//         )}
//       </Head>
//       <body>
//         {/* Google Tag Manager (noscript) */}
//         {isProd && hasConsent() && GTM_ID && (
//           <noscript>
//             <iframe
//               src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
//               height="0"
//               width="0"
//               style={{ display: 'none', visibility: 'hidden' }}
//               title="GTM"
//             />
//           </noscript>
//         )}
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }


import { Html, Head, Main, NextScript } from 'next/document';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const isProd = process.env.NODE_ENV === 'production';

// Enhanced consent management function
const hasConsent = () => {
  // Check if we're in browser environment
  if (typeof window === 'undefined') {
    console.log('🔍 GTM Consent: Server-side rendering, no consent check needed');
    return false; // Don't load GTM during SSR
  }

  // Check for existing consent in localStorage
  const consent = localStorage.getItem('gtm-consent');
  
  console.log('🔍 GTM Consent Check:', {
    consentValue: consent,
    hasConsent: consent === 'granted',
    timestamp: new Date().toISOString()
  });

  // If no consent stored, show consent banner and return false
  if (!consent) {
    console.log('⚠️ GTM: No consent found, showing consent banner');
    showConsentBanner();
    return false;
  }

  return consent === 'granted';
};

// Function to show consent banner
const showConsentBanner = () => {
  // Prevent multiple banners
  if (document.getElementById('consent-banner')) {
    return;
  }

  const banner = document.createElement('div');
  banner.id = 'consent-banner';
  banner.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #2d3748;
    color: white;
    padding: 20px;
    text-align: center;
    z-index: 9999;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  `;
  
  banner.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto;">
      <p style="margin: 0 0 15px 0; font-size: 14px;">
        We use cookies and similar technologies to improve your experience and analyze site usage. 
        This includes Google Analytics for understanding how visitors interact with our site.
      </p>
      <div>
        <button id="accept-consent" style="
          background: #4299e1; 
          color: white; 
          border: none; 
          padding: 10px 20px; 
          margin: 0 10px; 
          border-radius: 4px; 
          cursor: pointer;
          font-size: 14px;
        ">Accept All</button>
        <button id="reject-consent" style="
          background: #718096; 
          color: white; 
          border: none; 
          padding: 10px 20px; 
          margin: 0 10px; 
          border-radius: 4px; 
          cursor: pointer;
          font-size: 14px;
        ">Reject</button>
      </div>
    </div>
  `;

  document.body.appendChild(banner);

  // Handle accept
  document.getElementById('accept-consent').onclick = () => {
    localStorage.setItem('gtm-consent', 'granted');
    console.log('✅ GTM: Consent granted, reloading page to initialize GTM');
    banner.remove();
    // Reload page to initialize GTM
    window.location.reload();
  };

  // Handle reject
  document.getElementById('reject-consent').onclick = () => {
    localStorage.setItem('gtm-consent', 'denied');
    console.log('❌ GTM: Consent denied');
    banner.remove();
  };
};

export default function Document() {
  // Debug logging
  console.log('🚀 GTM Document Debug:', {
    GTM_ID,
    isProd,
    NODE_ENV: process.env.NODE_ENV,
    hasConsentResult: typeof window !== 'undefined' ? hasConsent() : 'SSR',
    shouldLoadGTM: isProd && (typeof window !== 'undefined' ? hasConsent() : false) && GTM_ID,
    timestamp: new Date().toISOString()
  });

  const shouldLoadGTM = isProd && hasConsent() && GTM_ID;

  if (shouldLoadGTM) {
    console.log('✅ GTM: Loading Google Tag Manager');
  } else {
    console.log('❌ GTM: Not loading Google Tag Manager', {
      isProd,
      hasConsent: typeof window !== 'undefined' ? hasConsent() : 'SSR',
      GTM_ID: !!GTM_ID
    });
  }

  return (
    <Html lang="en">
      <Head>
        {/* Google Tag Manager - Head */}
        {shouldLoadGTM && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  console.log('🔧 GTM: Initializing Google Tag Manager with ID: ${GTM_ID}');
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${GTM_ID}');
                  console.log('✅ GTM: Google Tag Manager script injected');
                `,
              }}
            />
          </>
        )}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {shouldLoadGTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="GTM"
            />
          </noscript>
        )}
        <Main />
        <NextScript />
        
        {/* Client-side script to handle consent banner */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Client-side consent management
              (function() {
                console.log('🎯 GTM: Client-side consent check initiated');
                
                function checkAndShowConsent() {
                  const consent = localStorage.getItem('gtm-consent');
                  console.log('🔍 Client-side consent status:', consent);
                  
                  if (!consent) {
                    ${showConsentBanner.toString()}
                    showConsentBanner();
                  }
                }
                
                // Run when DOM is ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', checkAndShowConsent);
                } else {
                  checkAndShowConsent();
                }
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}