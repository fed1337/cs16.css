import {copyFileSync, mkdirSync, readFileSync, writeFileSync,} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import {transform} from "lightningcss";

const root = dirname(fileURLToPath(import.meta.url));
const input = join(root, "src/cs16.css");
const distDir = join(root, "dist");
const cssOutput = join(distDir, "cs16.min.css");

mkdirSync(distDir, {recursive: true});

const {code} = transform({
    filename: "cs16.css",
    code: readFileSync(input),
    minify: true,
    targets: {
        chrome: 109 << 16,
        firefox: 115 << 16,
    },
});

const css = code.toString();

if (/[^{}]&[.:{>+~[\s]/.test(css)) {
    throw new Error("Build output still contains nested & selectors — flattening failed");
}

if (/(?:--|__)[\w-]+\.cs-/.test(css)) {
    throw new Error("Build output contains broken BEM selectors — use flat cs-block-variant classes");
}

writeFileSync(cssOutput, css);

const previewHtml = readFileSync(join(root, "index.html"), "utf8")
    .replace('href="/src/cs16.css"', 'href="./cs16.min.css"')
    .replace('href="/src/index.css"', 'href="./index.css"');

writeFileSync(join(distDir, "index.html"), previewHtml);
copyFileSync(join(root, "src/index.css"), join(distDir, "index.css"));

console.log("Built dist/cs16.min.css (flattened + minified)");
console.log("Built dist/index.html + dist/index.css");
