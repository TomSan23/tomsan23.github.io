import { resolve } from 'path';
import Sitemap from 'vite-plugin-sitemap'
import handlebars from 'vite-plugin-handlebars';
import fs from 'fs';
import path from 'path';

export default {
    build: {
        outDir: 'docs',
        emptyOutDir: true,
        rollupOptions: {
            input: [
                'index.html',
                'about.html',
                'contact.html',
                'gallery.html',
                'services.html',
                'service-area.html',
                '404.html'],
        }
    },
    plugins: [
        Sitemap({
            outDir: 'docs',
            hostname: 'https://santoyodesign.com'
        }),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
            context: {
                theme: 'emerald',
            },
            helpers: {
                resolveAssetUrl: (url) => {
                    // Read the content of the dist directory
                    const distDir = fs.readdirSync('docs/assets');

                    // Get the file name without the directory path and the extension
                    const fileName = path.basename(url, path.extname(url));

                    console.log(fileName)

                    // Find the file that matches the original image name
                    const compiledFileName = distDir.find(file => file.includes(fileName));

                    // If a matching file is found, return the new file name
                    if (compiledFileName) {
                        return `/assets/${compiledFileName}`;
                    }

                    // If no matching file is found, return the original url
                    return url;
                }
            }
        })
    ],
};
