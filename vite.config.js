import {defineConfig} from 'vite'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import browserslist from 'browserslist'
import {transform, browserslistToTargets} from 'lightningcss'

const cssInput = resolve(__dirname, 'src/cs16.css')
const cssUrl = '/src/cs16.css'

function transformCss({minify}) {
    const {code} = transform({
        filename: 'cs16.css',
        code: readFileSync(cssInput),
        minify,
        targets: browserslistToTargets(browserslist()),
    })

    return code.toString()
}

function validateCss(css) {
    if (/[^{}]&[.:{>+~[\s]/.test(css)) {
        throw new Error('Build output still contains nested & selectors — flattening failed')
    }

    if (/(?:--|__)[\w-]+\.cs-/.test(css)) {
        throw new Error('Build output contains broken BEM selectors — use flat cs-block-variant classes')
    }
}

function cs16CssDevPlugin() {
    return {
        name: 'cs16-css-dev',
        apply: 'serve',
        configureServer(server) {
            const serveCss = () => transformCss({minify: false})

            server.middlewares.use((req, res, next) => {
                if (req.url?.split('?')[0] === cssUrl) {
                    res.setHeader('Content-Type', 'text/css')
                    res.end(serveCss())
                    return
                }

                next()
            })

            server.watcher.on('change', (file) => {
                if (file === cssInput) {
                    server.ws.send({type: 'full-reload', path: '*'})
                }
            })
        },
    }
}

function cs16CssBuildPlugin() {
    return {
        name: 'cs16-css-build',
        apply: 'build',
        config() {
            return {
                build: {
                    rollupOptions: {
                        input: 'virtual:cs16-build-entry',
                    },
                },
            }
        },
        resolveId(id) {
            if (id === 'virtual:cs16-build-entry') {
                return id
            }
        },
        load(id) {
            if (id === 'virtual:cs16-build-entry') {
                return ''
            }
        },
        buildStart() {
            const css = transformCss({minify: true})
            validateCss(css)
            this.emitFile({
                type: 'asset',
                fileName: 'cs16.min.css',
                source: css,
            })
        },
        generateBundle(_options, bundle) {
            for (const fileName of Object.keys(bundle)) {
                if (fileName.endsWith('.js')) {
                    delete bundle[fileName]
                }
            }
        },
    }
}

export default defineConfig({
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist()),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        cssMinify: 'lightningcss',
    },
    plugins: [cs16CssDevPlugin(), cs16CssBuildPlugin()],
})
