const fs = require('fs');
const path = require('path');

const docsPath = path.resolve(__dirname, './docs'); // 确保路径正确

function generateSidebarConfig(dirPath, basePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  const sidebar = entries
    // 过滤掉以 . 开头的文件（通常是隐藏文件）和指定的 ./docs/index.md 文件
    .filter(entry => {
      const fullPath = path.join(dirPath, entry.name);
      // 检查是否是 ./docs/index.md 文件
      const isDocsIndexMd = fullPath.replace(/\\/g, '/') === path.join(docsPath, 'index.md').replace(/\\/g, '/');
      return !entry.name.startsWith('.') && !isDocsIndexMd;
    })

    .map(entry => {
      const entryPath = path.join(dirPath, entry.name);
      // 为 relativePath 的构建逻辑添加一个前导 '/'
      const relativePath = '/' + path.join(basePath, entry.name.replace(/\.md$/, '')).replace(/\\/g, '/');


      if (entry.isDirectory()) {
        // 如果是目录，递归构建其下的sidebar配置
        const nestedConfig = generateSidebarConfig(entryPath, `${relativePath}/`);
        return { text: entry.name, items: nestedConfig };
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // 如果是Markdown文件，添加到sidebar配置中
        const basename = path.basename(entry.name, '.md');
        const link = `${basePath}${basename === 'index' ? '' : basename}`;
        return { text: basename, link: link.replace(/\\/g, '/') }; // 确保链接路径是正斜杠
      }
    })
    .filter(Boolean); // 过滤掉undefined项

  return sidebar;
}

const sidebarConfig = generateSidebarConfig(docsPath);

const sidebarPath = path.resolve(__dirname, './docs/sidebar.json');
fs.writeFileSync(sidebarPath, JSON.stringify(sidebarConfig, null, 2));