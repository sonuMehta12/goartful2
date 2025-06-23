/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },

  async redirects() {
    return [
      // Redirect /wishlist to /coming-soon
      {
        source: "/wishlist",
        destination: "/coming-soon",
        permanent: false, // Set to true if this is a permanent redirect in the future
      },
      // Redirect /settings to /coming-soon
      {
        source: "/settings",
        destination: "/coming-soon",
        permanent: false,
      },
      // Redirect /profile or /profile/me to /coming-soon
      // If /profile/me is the primary profile route you link to:
      {
        source: "/profile/me",
        destination: "/coming-soon",
        permanent: false,
      },
      // If you also want /profile to redirect (e.g., if users might type it)
      {
        source: "/profile",
        destination: "/coming-soon",
        permanent: false,
      },
      // Redirect /notifications to /coming-soon
      {
        source: "/notifications",
        destination: "/coming-soon",
        permanent: false,
      },
      // Redirect /my-experiences to /coming-soon
      {
        source: "/my-experiences",
        destination: "/coming-soon",
        permanent: false,
      },

      // Add more redirects as needed:
      // {
      //   source: '/notifications',
      //   destination: '/coming-soon',
      //   permanent: false,
      // },
      // {
      //   source: '/my-experiences',
      //   destination: '/coming-soon',
      //   permanent: false,
      // },
      // ... and so on for other routes you want to temporarily redirect
    ];
  },
};

module.exports = nextConfig;
