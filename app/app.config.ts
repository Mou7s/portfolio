export default defineAppConfig({
  global: {
    picture: {
      dark: "https://pic1.imgdb.cn/item/6926ac683203f7be0033f8c3.png",
      light: "https://pic1.imgdb.cn/item/6926ac683203f7be0033f8c3.png",
      alt: "My profile picture",
    },
    meetingLink: "https://cal.com/mou7s/30min/",
    email: "mou7s@icloud.com",
    available: true,
  },
  ui: {
    colors: {
      primary: "blue",
      neutral: "neutral",
    },
    pageHero: {
      slots: {
        container: "py-18 sm:py-24 lg:py-32",
        title: "mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl",
        description:
          "mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted",
      },
    },
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [
      {
        icon: "i-simple-icons-steam",
        to: "https://steamcommunity.com/id/mou7s/",
        target: "_blank",
        "aria-label": "Mou7s on Steam",
      },
      {
        icon: "i-simple-icons-github",
        to: "https://github.com/mou7s",
        target: "_blank",
        "aria-label": "Mou7s on GitHub",
      },
      {
        icon: "i-simple-icons-bilibili",
        to: "https://space.bilibili.com/259438522",
        target: "_blank",
        "aria-label": "Mou7s on Bilibili",
      },
      {
        icon: "i-simple-icons-x",
        to: "https://x.com/Mou7s1337",
        target: "_blank",
        "aria-label": "Mou7s on X",
      },
    ],
  },
});
