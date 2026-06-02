import type { NavigationMenuItem } from "@nuxt/ui";

export const useNavLinks = () => {
  const { t } = useI18n();
  const localePath = useLocalePath();

  return computed<NavigationMenuItem[]>(() => [
    {
      label: t("nav.home"),
      icon: "i-lucide-home",
      to: localePath("/"),
      class: "min-w-[50px] sm:min-w-[65px] justify-center text-center",
    },
    {
      label: t("nav.experience"),
      icon: "i-lucide-briefcase",
      to: localePath("/experience"),
      class: "min-w-[80px] sm:min-w-[100px] justify-center text-center",
    },
    {
      label: t("nav.projects"),
      icon: "i-lucide-folder",
      to: localePath("/projects"),
      class: "min-w-[65px] sm:min-w-[80px] justify-center text-center",
    },
    {
      label: t("nav.blog"),
      icon: "i-lucide-file-text",
      to: localePath("/blog"),
      class: "min-w-[45px] sm:min-w-[55px] justify-center text-center",
    },
    {
      label: t("nav.about"),
      icon: "i-lucide-user",
      to: localePath("/about"),
      class: "min-w-[50px] sm:min-w-[65px] justify-center text-center",
    },
  ]);
};
