require("dotenv").config({ path: ".env.development" })

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/star.svg`, // This path is relative to the root of the site.
        // applicationServerKey:
        //   "https://updates.push.services.mozilla.com/wpush/v1/gAAAAABg1…cBKkfuaNtT6ieSAGimqFSksIVp5uozGZuyr0ubKF6pwdYIcIV1kpKEH1Wh3U",
        // gcm_sender_id: "103953800507",
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        appendScript: require.resolve(`${__dirname}/src/notification-sw.js`),
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "aquarius__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "aquarius",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "pisces__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "pisces",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "aries__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "aries",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "taurus__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "taurus",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "gemini__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "gemini",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "cancer__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "cancer",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "leo__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "leo",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "virgo__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "virgo",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "libra__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "libra",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "scorpio__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "scorpio",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "sagittarius__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "sagittarius",
          day: "today",
        },
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "capricorn__",
        url: `https://sameer-kumar-aztro-v1.p.rapidapi.com/`,
        method: "post",
        headers: {
          "x-rapidapi-key":
            "a3ec161e45msh033e5e93cfd0782p12354djsn2b543b83189b",
          "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        },
        name: `info`,
        params: {
          sign: "capricorn",
          day: "today",
        },
      },
    },
    // Get weekly horoscope.

    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: `.env.${process.env.GATSBY_SUBSCRIBE_URL}week`,
        method: "get",
        name: `weekInfo`,
      },
    },
  ],
}
