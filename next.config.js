/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.dicebear.com', 'res.cloudinary.com', 'secure.gravatar.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = nextConfig
