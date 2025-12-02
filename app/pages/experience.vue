<script setup lang="ts">
type Highlight = {
  title: string;
  detail: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: Highlight[];
  stack: string[];
};

const page = {
  title: "Work Experience & Outcomes",
  description:
    "Selected roles with measurable outcomes across full-stack delivery, networking, and operational efficiency.",
  seo: {
    title: "Experience | Work Experience & Outcomes",
    description:
      "Full-stack and infrastructure experience with representative outcomes across web delivery, design, and network/ERP operations.",
  },
};

const experiences: Experience[] = [
  {
    company: "Dongguan Shanze New Energy Technology Co., Ltd.",
    role: "Full-stack Engineer",
    period: "2025.07 - Present",
    location: "Dongguan · Remote",
    summary:
      "Own the corporate website and admin backend end-to-end while also handling design, video editing, and network/ERP operations to keep brand and internal workflows running smoothly.",
    highlights: [
      {
        title: "Full-stack delivery",
        detail:
          "Built the corporate site and services from scratch, covering discovery, development, launch, and iterations to support brand and lead generation.",
      },
      {
        title: "Design & assets",
        detail:
          "Produced expo materials, company decks, logo, and promo videos to keep visuals consistent and support marketing activities.",
      },
      {
        title: "Network & workflows",
        detail:
          "Manage the company network and ERP/SOP operations, ensuring stability, access control, and smoother day-to-day collaboration.",
      },
    ],
    stack: ["Vue", "Node.js", "Tailwind CSS", "Design/Editing", "ERP & Network Ops"],
  },
  {
    company: "Dongguan Xinpu Paper Co., Ltd.",
    role: "Network Engineer",
    period: "2025.01 - 2025.07",
    location: "Dongguan",
    summary:
      "Rebuilt the network topology for a 200-person company to improve ERP and internal systems while also supporting surveillance, design, and event planning.",
    highlights: [
      {
        title: "Network rebuild",
        detail:
          "Reworked the topology and deployed routers with AP/AC mesh, improving coverage and management while reducing connection issues.",
      },
      {
        title: "System reliability",
        detail:
          "Configured TCP/IP, VPN, and tunneling to keep ERP and internal data transfer secure and stable.",
      },
      {
        title: "Digital efficiency",
        detail:
          "Ramped up on ERP quickly, improving sales, inventory, and production data entry and lookup to cut handling time.",
      },
      {
        title: "Security & cabling",
        detail:
          "Installed and tuned surveillance; built cables and optimized wiring for reliable connectivity and site safety.",
      },
      {
        title: "Design & events",
        detail:
          "Produced 100+ drawings and decks with Illustrator/Photoshop; set up shared docs and led an 800-person annual gala, pushing paperless workflows.",
      },
    ],
    stack: [
      "Network Topology",
      "AP/AC",
      "VPN/Tunneling",
      "ERP",
      "CCTV",
      "Design/Decks",
    ],
  },
  {
    company: "Dongguan Fufeng Auto Co., Ltd.",
    role: "Admin & Network Engineer",
    period: "2023.11 - 2024.12",
    location: "Dongguan",
    summary:
      "Handled store network and day-to-day IT support, covered admin and asset management, and kept sales/service operations stable while improving architecture and training the team.",
    highlights: [
      {
        title: "Network reliability",
        detail:
          "Built and maintained LAN, routers, and firewalls; optimized architecture to lower incident rates and stay online during peak hours.",
      },
      {
        title: "Admin & assets",
        detail:
          "Managed device procurement, software installs, backups, and access controls to optimize the office environment and control costs.",
      },
      {
        title: "IT support",
        detail:
          "Provided daily support for network, printers, and software; assisted DMS and inventory integrations to push digital workflows.",
      },
      {
        title: "Security & backups",
        detail:
          "Implemented firewalls and antivirus, scheduled updates and backups to reduce potential security risks.",
      },
    ],
    stack: [
      "Enterprise Networking",
      "Routing/Switching",
      "Windows/Office",
      "DMS Integration",
      "Firewall/Security",
    ],
  },
];

const { global } = useAppConfig();

useSeoMeta({
  title: page.seo.title,
  ogTitle: page.seo.title,
  description: page.seo.description,
  ogDescription: page.seo.description,
});
</script>

<template>
  <UPage>
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <template #links>
        <UButton :to="`mailto:${global.email}`" label="Contact Me" />
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <div class="space-y-10">
        <div
          v-for="experience in experiences"
          :key="experience.company"
          class="border border-default rounded-2xl p-6 bg-muted/20"
        >
          <div
            class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p
                class="text-xs font-medium uppercase tracking-[0.3em] text-muted"
              >
                {{ experience.period }}
              </p>
              <h2 class="mt-1 text-xl font-semibold text-highlighted">
                {{ experience.role }} · {{ experience.company }}
              </h2>
              <p class="text-sm text-muted">{{ experience.location }}</p>
            </div>

            <div class="flex flex-wrap gap-2 text-xs text-muted">
              <span
                v-for="(tag, index) in experience.stack"
                :key="`${experience.company}-tag-${index}`"
                class="rounded-full border border-default px-3 py-1"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <p class="mt-4 text-base text-default-700">
            {{ experience.summary }}
          </p>

          <div class="mt-6 grid gap-4 lg:grid-cols-3">
            <div
              v-for="highlight in experience.highlights"
              :key="`${experience.company}-${highlight.title}`"
              class="rounded-xl border border-default/70 bg-default-50/50 p-4"
            >
              <p class="text-sm font-semibold text-highlighted">
                {{ highlight.title }}
              </p>
              <p class="mt-2 text-sm leading-relaxed text-default-700">
                {{ highlight.detail }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
