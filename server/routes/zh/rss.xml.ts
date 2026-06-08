import { renderBlogRss } from "../../utils/rss";

export default defineEventHandler((event) => renderBlogRss(event, "zh"));
