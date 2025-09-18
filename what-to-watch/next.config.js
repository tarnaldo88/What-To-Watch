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
            {
                protocol: "https",
                hostname: "links.papareact.com"
            },
        ],
    }

}

module.exports = nextConfig
