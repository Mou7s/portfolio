import type { H3Event } from "h3";
import { parse as parseYaml } from "yaml";

type FeedLocale = "en" | "zh";

type BlogPost = {
  title?: string;
  description?: string;
  path?: string;
  date?: string | Date;
  author?: {
    name?: string;
  };
};

type BlogPage = {
  title?: string;
  description?: string;
};

const localeMeta: Record<FeedLocale, { language: string; feedPath: string; blogPath: string; defaultTitle: string; defaultDescription: string }> = {
  en: {
    language: "en-US",
    feedPath: "/rss.xml",
    blogPath: "/blog",
    defaultTitle: "mou7s Blog",
    defaultDescription: "Latest articles from mou7s.",
  },
  zh: {
    language: "zh-CN",
    feedPath: "/zh/rss.xml",
    blogPath: "/zh/blog",
    defaultTitle: "mou7s 博客",
    defaultDescription: "mou7s 的最新文章。",
  },
};

const escapeXml = (value: unknown = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const getSiteUrl = (event: H3Event) => {
  const configuredSiteUrl = String(useRuntimeConfig().public.siteUrl || "").trim();

  if (configuredSiteUrl) {
    return stripTrailingSlash(configuredSiteUrl);
  }

  const protocol = getRequestHeader(event, "x-forwarded-proto")?.split(",")[0]?.trim() || getRequestProtocol(event);
  const host = getRequestHeader(event, "x-forwarded-host")?.split(",")[0]?.trim() || getRequestHost(event);

  return `${protocol}://${host}`;
};

const createAbsoluteUrl = (siteUrl: string, path: string) => new URL(path, `${siteUrl}/`).toString();

const resolveBlogLink = (path: string | undefined, locale: FeedLocale) => {
  const slug = path?.replace(/^\/(en|zh)\/blog\//, "").replace(/^blog\//, "") || "";

  return locale === "zh" ? `/zh/blog/${slug}` : `/blog/${slug}`;
};

const formatRssDate = (date?: string | Date) => {
  if (!date) {
    return new Date().toUTCString();
  }

  return new Date(date).toUTCString();
};

const contentKey = (...segments: string[]) => segments.join(":");

const readContentFile = async (...segments: string[]) => {
  const key = contentKey(...segments);
  const source = await useStorage("assets:content").getItemRaw<string | Uint8Array>(key);

  if (typeof source === "string") {
    return source;
  }

  if (source instanceof Uint8Array) {
    return new TextDecoder().decode(source);
  }

  throw createError({
    statusCode: 500,
    statusMessage: `Content file not found: ${segments.join("/")}`,
  });
};

const readYamlFile = async <T>(...segments: string[]) => {
  const source = await readContentFile(...segments);

  return parseYaml(source) as T;
};

const readMarkdownFrontmatter = async <T>(...segments: string[]) => {
  const source = await readContentFile(...segments);
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = match?.[1];

  return (frontmatter ? parseYaml(frontmatter) : {}) as T;
};

const readBlogPosts = async (locale: FeedLocale) => {
  const baseKey = contentKey(locale, "blog");
  const files = (await useStorage("assets:content").getKeys(baseKey))
    .filter((key) => key.endsWith(".md"));

  const posts = await Promise.all(files.map(async (file) => {
    const itemKey = file.includes(":") ? file : contentKey(baseKey, file);
    const slug = itemKey.split(":").pop()?.replace(/\.md$/, "") || "";
    const frontmatter = await readMarkdownFrontmatter<BlogPost>(...itemKey.split(":"));

    return {
      ...frontmatter,
      path: `/${locale}/blog/${slug}`,
    };
  }));

  return posts.sort((a, b) => {
    const aTime = new Date(a.date || 0).getTime();
    const bTime = new Date(b.date || 0).getTime();

    return bTime - aTime || String(a.title || "").localeCompare(String(b.title || ""));
  });
};

export const renderBlogRss = async (event: H3Event, locale: FeedLocale) => {
  const meta = localeMeta[locale];
  const siteUrl = getSiteUrl(event);
  const feedUrl = createAbsoluteUrl(siteUrl, meta.feedPath);
  const blogUrl = createAbsoluteUrl(siteUrl, meta.blogPath);

  const [page, posts] = await Promise.all([
    readYamlFile<BlogPage>(locale, "blog.yml"),
    readBlogPosts(locale),
  ]);

  const title = page?.title || meta.defaultTitle;
  const description = page?.description || meta.defaultDescription;
  const lastBuildDate = posts[0]?.date ? formatRssDate(posts[0].date) : formatRssDate();

  const items = posts
    .map((post) => {
      const articleUrl = createAbsoluteUrl(siteUrl, resolveBlogLink(post.path, locale));

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(articleUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(articleUrl)}</guid>`,
        `      <pubDate>${escapeXml(formatRssDate(post.date))}</pubDate>`,
        post.author?.name ? `      <dc:creator>${escapeXml(post.author.name)}</dc:creator>` : "",
        `      <description>${escapeXml(post.description)}</description>`,
        "    </item>",
      ].filter(Boolean).join("\n");
    })
    .join("\n");

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=300, s-maxage=3600");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(title)}</title>`,
    `    <link>${escapeXml(blogUrl)}</link>`,
    `    <description>${escapeXml(description)}</description>`,
    `    <language>${meta.language}</language>`,
    `    <lastBuildDate>${escapeXml(lastBuildDate)}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ].filter(Boolean).join("\n");
};
