import createMiddleware from 'next-intl/middleware';
import { locales } from '@/config';

export default createMiddleware({
  locales: locales,
  defaultLocale: 'en', // We keep 'en' as internal ID but display Vietnamese
  localePrefix: 'never' // This is the key: never show /en/ or /vi/ in URL
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - Static files (e.g. /favicon.ico, /images, etc.)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
