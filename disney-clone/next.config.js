/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname:"w.wallhaven.cc"
            },
            {
                protocol: "http",
                hostname: "image.tmdb.org"
            },
        ],
    }

}

module.exports = nextConfig
