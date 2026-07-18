import fs from 'node:fs/promises'

await fs.copyFile('dist/index.html', 'dist/404.html')
console.log('Created GitHub Pages fallback: dist/404.html')
