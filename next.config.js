/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const nextConfig = {

    images: {
        domains: [
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "res.cloudinary.com"
        ]
    },
    // i18n: {
    //     locales: ['en', 'fi', 'sv'], // Add your default language and other languages
    //     defaultLocale: 'fi', // Set the default language
    // },

    experimental: {
        serverActions: true,
    },
}





module.exports = withNextIntl(nextConfig);
