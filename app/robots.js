export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/answers', '/api/'] },
    sitemap: 'https://www.bercohome.com/sitemap.xml',
  }
}
