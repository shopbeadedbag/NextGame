const fs = require('fs');
const path = require('path');

// 读取 feed.json 获取所有游戏数据
const feedPath = path.join(process.cwd(), 'feed.json');
const feedData = JSON.parse(fs.readFileSync(feedPath, 'utf8'));

// 从项目配置中读取域名
const configPath = path.join(process.cwd(), 'config', 'site.ts');
const configContent = fs.readFileSync(configPath, 'utf8');
const siteUrlMatch = configContent.match(/SITE_URL\s*[=:]\s*['"]([^'"]+)['"]/);
const BASE_URL = (siteUrlMatch ? siteUrlMatch[1] : 'https://your-domain.com').replace(/\/+$/, '');
// 生成 sitemap.xml
function generateSitemap() {
  const games = feedData;

  // 静态页面
  const staticPages = [
    '',
    '/game',
    '/categories',
    '/tags',
    '/about',
    '/privacy-policy',
    '/terms-of-service',
    '/contact'
  ];

  // 获取所有分类
  const categories = [...new Set(games.map(game => game.category).filter(Boolean))];

  // 获取所有标签
  const tags = new Set();
  games.forEach(game => {
    if (game.tags) {
      game.tags.split(',').forEach(tag => {
        if (tag.trim()) tags.add(tag.trim());
      });
    }
  });

  // 生成 XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // 添加静态页面
  staticPages.forEach(page => {
    xml += `  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>
`;
  });

  // 添加游戏页面
  games.forEach(game => {
    xml += `  <url>
    <loc>${BASE_URL}/game/${game.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // 添加分类页面
  categories.forEach(category => {
    xml += `  <url>
    <loc>${BASE_URL}/categories/${category.toLowerCase()}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  });

  // 添加标签页面
  Array.from(tags).forEach(tag => {
    const slug = tag.toLowerCase().replace(/\s+/g, '-');
    xml += `  <url>
    <loc>${BASE_URL}/tags/${encodeURIComponent(slug)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
`;
  });

  xml += '</urlset>';

  // 写入文件
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml);
  console.log('✅ sitemap.xml generated successfully');
}

// 生成 robots.txt
function generateRobotsTxt() {
  const content = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay for bots that support it
Crawl-delay: 1

# Block admin and private pages
Disallow: /api/
Disallow: /admin/
Disallow: /private/
`;

  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(robotsPath, content);
  console.log('✅ robots.txt generated successfully');
}

// 执行生成
async function main() {
  try {
    // 确保 public 目录存在
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    generateSitemap();
    generateRobotsTxt();
    console.log('\n🎉 SEO files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, generateRobotsTxt };
