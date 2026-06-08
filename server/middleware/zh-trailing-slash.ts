import { getRequestURL, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const url = getRequestURL(event);

  if (url.pathname === "/zh") {
    return sendRedirect(event, `/zh/${url.search}`, 301);
  }
});
