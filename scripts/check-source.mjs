import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
const root = process.cwd();
const excluded = new Set([
  "node_modules",
  ".git",
  ".reference",
  ".private",
  "out",
]);
const forbidden = [
  /mrb1\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
  /q-signature=[a-f0-9]{20,}/,
  /q-ak=AKID[A-Za-z0-9]{10,}/,
  /(?:ghp|gho)_[A-Za-z0-9]{20,}/,
];
let checked = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isSymbolicLink())
      throw new Error(`Symlink must be reviewed: ${relative(root, path)}`);
    if (entry.isDirectory()) await walk(path);
    else if (
      /\.(?:tsx?|mjs|json|md|txt|sh|ya?ml)$|^\.gitignore$/.test(entry.name)
    ) {
      const text = await readFile(path, "utf8");
      if (forbidden.some((re) => re.test(text)))
        throw new Error(
          `Sensitive content detected in ${relative(root, path)}`,
        );
      checked++;
    }
  }
}
await walk(root);
console.log(
  `PASS: ${checked} source/document files scanned; no binding credentials or signed source URLs.`,
);
