import { resolve } from 'path';
import Sitemap from 'vite-plugin-sitemap'
import handlebars from 'vite-plugin-handlebars';

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
        })
    ],
};
